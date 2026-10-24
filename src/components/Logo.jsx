/**
 * The brand mark: thirteen modules on a 5×5 grid.
 *
 * At rest they spell a B. On hover the eight copper modules slide into new
 * cells and the same thirteen spell an N — nothing is added or removed, the
 * same parts in a different arrangement. The cream stem column is shared by
 * both letters and never moves.
 *
 * Styling lives in globals.css under `.bn-mark`; the component only lays out
 * the cells and carries each module's two positions as CSS variables, so the
 * hover morph and the one-time assembly on mount are pure CSS and respect
 * prefers-reduced-motion.
 */

const UNIT = 20; // grid pitch in viewBox units; module = 16, gap = 4

const STEM = [0, 1, 2, 3, 4].map((r) => [r, 0]);

// [row, col] in the B, then where that same module sits in the N.
const MOVERS = [
  [[0, 2], [0, 4]],
  [[1, 3], [1, 4]],
  [[2, 2], [2, 4]],
  [[3, 3], [3, 4]],
  [[4, 2], [4, 4]],
  [[0, 1], [1, 1]],
  [[2, 1], [2, 2]],
  [[4, 1], [3, 3]],
];

const at = ([r, c]) => `translate(${c * UNIT}px, ${r * UNIT}px)`;

const Logo = ({ size = 36, className = '', title = 'Belal Nagy' }) => (
  <svg
    className={`bn-mark ${className}`}
    width={size}
    height={size}
    viewBox="0 0 96 96"
    role="img"
    aria-label={title}>
    {STEM.map((cell, i) => (
      <g key={`s${i}`} style={{ transform: at(cell), '--i': i }}>
        <rect className="bn-cell bn-stem" width="16" height="16" rx="4.5" />
      </g>
    ))}
    {MOVERS.map(([b, n], i) => (
      <g
        key={`m${i}`}
        className="bn-mover"
        style={{ '--b': at(b), '--n': at(n), '--i': i + 5 }}>
        <rect className="bn-cell bn-copper" width="16" height="16" rx="4.5" />
      </g>
    ))}
  </svg>
);

export default Logo;
