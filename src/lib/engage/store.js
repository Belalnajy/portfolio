import { Redis } from '@upstash/redis';

/**
 * Storage for reactions and comments, behind the few operations the feature
 * needs. Two implementations with the same methods:
 *
 * - Upstash Redis over REST (works from Vercel functions). Configured by the
 *   Vercel "Upstash for Redis" integration, which sets KV_REST_API_URL and
 *   KV_REST_API_TOKEN; UPSTASH_REDIS_REST_URL / _TOKEN are accepted too.
 * - An in-memory store, for unit tests and `next dev` only. It is never used
 *   in a production build: there, no Redis means the feature is off.
 *
 * All values are strings or plain objects of strings.
 */

export const createMemoryStore = () => {
  const sets = new Map();
  const hashes = new Map();
  const zsets = new Map();
  const counters = new Map();
  const expiries = new Map();
  // Keys given a lifetime with expire() vanish once it has passed.
  const fresh = (key) => {
    const until = expiries.get(key);
    if (until !== undefined && until <= Date.now()) {
      expiries.delete(key);
      sets.delete(key);
    }
  };
  const set = (key) => {
    fresh(key);
    return sets.get(key) ?? sets.set(key, new Set()).get(key);
  };
  const zset = (key) => zsets.get(key) ?? zsets.set(key, new Map()).get(key);
  return {
    kind: 'memory',
    async sadd(key, member) {
      const s = set(key);
      const had = s.has(member);
      s.add(member);
      return had ? 0 : 1;
    },
    async srem(key, member) {
      return set(key).delete(member) ? 1 : 0;
    },
    async scard(key) {
      return set(key).size;
    },
    async sismember(key, member) {
      return set(key).has(member) ? 1 : 0;
    },
    /** Sets a lifetime on a set, unless it already has one (Redis EXPIRE NX). */
    async expire(key, seconds) {
      fresh(key);
      if (!expiries.has(key)) expiries.set(key, Date.now() + seconds * 1000);
    },
    /** Increments a counter that expires `seconds` after it was created. */
    async incrWindow(key, seconds, now = Date.now()) {
      const entry = counters.get(key);
      if (!entry || entry.until <= now) {
        counters.set(key, { value: 1, until: now + seconds * 1000 });
        return 1;
      }
      entry.value += 1;
      return entry.value;
    },
    async hset(key, fields) {
      hashes.set(key, { ...(hashes.get(key) ?? {}), ...fields });
    },
    async hgetall(key) {
      const value = hashes.get(key);
      return value ? { ...value } : null;
    },
    async del(key) {
      hashes.delete(key);
    },
    async zadd(key, score, member) {
      zset(key).set(member, score);
    },
    async zrem(key, member) {
      zset(key).delete(member);
    },
    async zcard(key) {
      return zset(key).size;
    },
    /** Members by descending score, `start` to `stop` inclusive. */
    async zrevrange(key, start, stop) {
      return [...zset(key).entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(start, stop + 1)
        .map(([member]) => member);
    },
  };
};

export const createRedisStore = ({ url, token }) => {
  const redis = new Redis({ url, token, automaticDeserialization: false });
  return {
    kind: 'redis',
    sadd: (key, member) => redis.sadd(key, member),
    srem: (key, member) => redis.srem(key, member),
    scard: (key) => redis.scard(key),
    sismember: (key, member) => redis.sismember(key, member),
    expire: (key, seconds) => redis.expire(key, seconds, 'NX'),
    async incrWindow(key, seconds) {
      const [value] = await redis.multi().incr(key).expire(key, seconds, 'NX').exec();
      return Number(value);
    },
    hset: (key, fields) => redis.hset(key, fields),
    async hgetall(key) {
      const value = await redis.hgetall(key);
      return value && Object.keys(value).length ? value : null;
    },
    del: (key) => redis.del(key),
    zadd: (key, score, member) => redis.zadd(key, { score, member }),
    zrem: (key, member) => redis.zrem(key, member),
    zcard: (key) => redis.zcard(key),
    zrevrange: (key, start, stop) => redis.zrange(key, start, stop, { rev: true }),
  };
};

/** The Redis credentials from the environment, or null. */
export const redisEnv = (env = process.env) => {
  const url = env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL;
  const token = env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
};

// One memory store per server process, so `next dev` keeps state between
// requests (and between hot reloads, through globalThis).
const memory = () => (globalThis.__engageMemoryStore ??= createMemoryStore());

/**
 * The store for this environment, or null when the feature is off:
 * Redis when it is configured; memory only outside production builds.
 */
export const getStore = (env = process.env) => {
  const redis = redisEnv(env);
  if (redis) return createRedisStore(redis);
  if (env.NODE_ENV !== 'production') return memory();
  return null;
};
