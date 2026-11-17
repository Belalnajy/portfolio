'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { track } from '@vercel/analytics';
import { FaPlay, FaFilePdf, FaFolderOpen, FaExternalLinkAlt, FaGoogleDrive, FaVideo } from 'react-icons/fa';
import SiteShell from '../SiteShell';
import Reveal from '../Reveal';
import { COURSES, VIDEOS, TEACHING_STATS, driveFolder, driveFile, drivePreview } from '../../lib/teaching';

/**
 * /teaching: the course material Belal teaches with at ITI, from his Google
 * Drive (src/lib/teaching.js).
 *
 * Nothing is fetched from Drive until someone asks for it. The video course
 * shows a drawn placeholder (number, title, play button); pressing play, or
 * "Watch" on a lecture row, swaps in Drive's own player in an iframe. Some
 * recordings are 1–3 GB and Drive may refuse to preview them, so the player
 * always has an "Open in Drive" link under it. The CSP allows frames from
 * drive.google.com only (next.config.js).
 *
 * Phones get one course at a time behind a two-way switch; from 768px both
 * courses are on the page.
 */

const pad = (n) => String(n).padStart(2, '0');

const ExternalLink = ({ href, icon, children, label, onClick, variant = 'quiet' }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={onClick}
    className={`press inline-flex items-center justify-center gap-2 min-h-11 px-4 rounded-xl text-sm font-semibold border transition-colors ${
      variant === 'primary'
        ? 'bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] border-[rgb(var(--primary))]/30 hover:bg-[rgb(var(--primary))]/20'
        : 'border-[rgb(var(--border-control))]/60 text-[rgb(var(--foreground))] hover:border-[rgb(var(--primary))] hover:text-[rgb(var(--primary))]'
    }`}>
    <span aria-hidden="true" className="text-xs shrink-0">{icon}</span>
    {children}
    {label && <span className="sr-only">: {label}</span>}
  </a>
);

const CourseHeader = ({ course, count }) => {
  const { t } = useTranslation();
  return (
    <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 max-md:mb-5">
      <div className="min-w-0">
        <h2 id={`course-${course.id}-title`} className="font-display text-2xl md:text-3xl font-bold text-[rgb(var(--foreground))] type-h2">
          {t(`teaching.courses.${course.id}.title`)}
        </h2>
        <p className="mt-1.5 text-sm font-semibold text-[rgb(var(--primary))]">
          {t(`teaching.courses.${course.id}.meta`, { count })}
        </p>
        <p className="mt-2 text-[rgb(var(--muted-foreground))] leading-relaxed type-body max-w-2xl">
          {t(`teaching.courses.${course.id}.desc`)}
        </p>
      </div>
      <ExternalLink
        href={driveFolder(course.folder)}
        icon={<FaGoogleDrive />}
        onClick={() => track('teaching_link', { course: course.id, type: 'course' })}>
        {t('teaching.actions.whole_course')}
      </ExternalLink>
    </header>
  );
};

const VideoCourse = ({ course }) => {
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);
  const frameRef = useRef(null);
  // Set by a press, so focus moves into the player only when a person asked.
  const focusFrame = useRef(false);

  const comma = i18n.language === 'ar' ? '، ' : ', ';
  const titleOf = (video) => `${t(`teaching.sections.${video.section}`)}${comma}${t('teaching.part', { n: video.part })}`;
  const video = VIDEOS[current];

  const play = (index) => {
    focusFrame.current = true;
    setCurrent(index);
    setPlaying(true);
    track('lecture_play', { course: course.id, lecture: VIDEOS[index].file });
    // On a phone the list sits under the player: bring the player back up.
    if (window.matchMedia('(max-width: 1023.98px)').matches) {
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      playerRef.current?.scrollIntoView({ block: 'start', behavior: smooth ? 'smooth' : 'auto' });
    }
  };

  useEffect(() => {
    if (!playing || !focusFrame.current) return;
    focusFrame.current = false;
    frameRef.current?.focus({ preventScroll: true });
  }, [playing, current]);

  return (
    <>
      <CourseHeader course={course} count={VIDEOS.length} />
      <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
        {/* Player */}
        <div ref={playerRef} className="lg:sticky lg:top-24 scroll-mt-24">
          {/* Fixed 16:9 box: the placeholder and the iframe take the same
              space, so loading the video moves nothing. */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-[rgb(var(--scrim))] ring-1 ring-[rgb(var(--border-subtle))]">
            {playing ? (
              <iframe
                key={video.drive}
                ref={frameRef}
                src={drivePreview(video.drive)}
                title={t('teaching.iframe_title', { name: titleOf(video) })}
                allow="autoplay; fullscreen"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0"
              />
            ) : (
              <button
                type="button"
                onClick={() => play(current)}
                aria-label={t('teaching.play_label', { name: titleOf(video) })}
                className="group absolute inset-0 w-full h-full text-start text-[rgb(var(--on-scrim))] bg-[radial-gradient(ellipse_at_top_right,rgb(var(--accent)/0.28),transparent_60%)] focus-visible:outline-offset-[-4px]">
                {/* A faint grid: a whiteboard, not a photo. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgb(var(--on-scrim))_1px,transparent_1px),linear-gradient(90deg,rgb(var(--on-scrim))_1px,transparent_1px)] bg-[size:32px_32px]"
                />
                <span aria-hidden="true" className="absolute top-4 start-4 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[rgb(var(--scrim))]/70 border border-[rgb(var(--on-scrim))]/15">
                  {t(`teaching.sections.${video.section}`)}
                </span>
                <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
                  <span className="flex items-center justify-center size-16 sm:size-20 rounded-full bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))] shadow-xl transition-transform motion-safe:group-hover:scale-105">
                    <FaPlay className="text-xl sm:text-2xl translate-x-0.5" />
                  </span>
                </span>
                <span aria-hidden="true" className="absolute bottom-4 inset-x-4 flex items-end gap-3">
                  <span className="font-display text-4xl sm:text-5xl font-bold leading-none text-[rgb(var(--primary))]" dir="ltr">
                    {pad(video.number)}
                  </span>
                  <span className="min-w-0 pb-0.5">
                    <span className="block font-semibold leading-snug truncate">{titleOf(video)}</span>
                    <span className="block text-xs text-[rgb(var(--on-scrim-muted))] font-mono truncate" dir="ltr">
                      {video.file}
                    </span>
                  </span>
                </span>
              </button>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="text-xs text-[rgb(var(--muted-foreground))] leading-relaxed max-w-md">
              {t('teaching.player_note')}
            </p>
            <ExternalLink href={driveFile(video.drive)} icon={<FaExternalLinkAlt />} label={titleOf(video)}>
              {t('teaching.actions.open_drive')}
            </ExternalLink>
          </div>
        </div>

        {/* Lecture list, in the order they were taught. */}
        <div className="space-y-6">
          {course.sections.map((section) => (
            <div key={section.id}>
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[rgb(var(--muted-foreground))] mb-2 px-1">
                {t(`teaching.sections.${section.id}`)}
              </h3>
              <ol className="rounded-xl border border-[rgb(var(--border-subtle))] divide-y divide-[rgb(var(--border-subtle))] overflow-hidden">
                {VIDEOS.map((item, index) => ({ item, index }))
                  .filter(({ item }) => item.section === section.id)
                  .map(({ item, index }) => {
                    const active = index === current && playing;
                    return (
                      <li key={item.drive}>
                        <button
                          type="button"
                          onClick={() => play(index)}
                          aria-current={active ? 'true' : undefined}
                          className={`press w-full flex items-center gap-3 min-h-14 px-3 py-2.5 text-start transition-colors ${
                            active ? 'bg-[rgb(var(--primary))]/10' : 'hover:bg-[rgb(var(--muted))]/30'
                          }`}>
                          <span
                            aria-hidden="true"
                            dir="ltr"
                            className={`shrink-0 inline-flex items-center justify-center size-9 rounded-lg text-sm font-bold tabular-nums ${
                              active
                                ? 'bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))]'
                                : 'bg-[rgb(var(--muted))]/40 text-[rgb(var(--muted-foreground))]'
                            }`}>
                            {pad(item.number)}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-semibold text-[rgb(var(--foreground))] text-sm">
                              {t('teaching.part', { n: item.part })}
                            </span>
                            <span className="block text-xs text-[rgb(var(--muted-foreground))] font-mono truncate" dir="ltr">
                              {item.file}
                            </span>
                          </span>
                          <span className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold ${active ? 'text-[rgb(var(--primary))]' : 'text-[rgb(var(--muted-foreground))]'}`}>
                            <FaPlay aria-hidden="true" className="text-[9px]" />
                            {active ? t('teaching.actions.now_playing') : t('teaching.actions.watch')}
                          </span>
                          <span className="sr-only">: {titleOf(item)}</span>
                        </button>
                      </li>
                    );
                  })}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const LectureCourse = ({ course }) => {
  const { t } = useTranslation();
  const link = (lecture, type) => () => track('teaching_link', { course: course.id, lecture: lecture.id, type });
  return (
    <>
      <CourseHeader course={course} count={course.lectures.length} />
      <ol className="rounded-xl border border-[rgb(var(--border-subtle))] divide-y divide-[rgb(var(--border-subtle))]">
        {course.lectures.map((lecture, index) => {
          const name = t('teaching.lecture', { n: index + 1 });
          return (
            <li key={lecture.id} className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 p-4 md:px-5">
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <span aria-hidden="true" dir="ltr" className="shrink-0 inline-flex items-center justify-center size-9 rounded-lg bg-[rgb(var(--muted))]/40 text-sm font-bold tabular-nums text-[rgb(var(--muted-foreground))]">
                  {pad(index + 1)}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[rgb(var(--muted-foreground))]">{name}</p>
                  <h3 className="font-semibold text-[rgb(var(--foreground))] leading-snug">
                    {t(`teaching.topics.${lecture.id}`)}
                  </h3>
                </div>
              </div>
              {/* Phones: the actions are a row of equal, thumb-sized buttons. */}
              <div className={`grid gap-2 shrink-0 ${lecture.labVideo ? 'grid-cols-3' : 'grid-cols-2'} md:flex md:flex-wrap md:justify-end`}>
                <ExternalLink href={driveFile(lecture.slides)} icon={<FaFilePdf />} label={name} variant="primary" onClick={link(lecture, 'slides')}>
                  {t('teaching.actions.slides')}
                </ExternalLink>
                <ExternalLink href={driveFolder(lecture.folder)} icon={<FaFolderOpen />} label={name} onClick={link(lecture, 'folder')}>
                  {t('teaching.actions.demos')}
                </ExternalLink>
                {lecture.labVideo && (
                  <ExternalLink href={driveFile(lecture.labVideo)} icon={<FaVideo />} label={name} onClick={link(lecture, 'lab_video')}>
                    {t('teaching.actions.lab_video')}
                  </ExternalLink>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
};

const TeachingContent = () => {
  const { t } = useTranslation();
  const [shown, setShown] = useState(COURSES[0].id);

  const stats = [
    { key: 'courses', value: TEACHING_STATS.courses },
    { key: 'lectures', value: TEACHING_STATS.lectures },
    { key: 'decks', value: TEACHING_STATS.decks },
    { key: 'code', value: `${TEACHING_STATS.codeFiles}+` },
  ];

  return (
    <div className="container mx-auto px-5 sm:px-6 pt-28 m-page-top pb-20 max-md:pb-14 max-w-6xl text-start">
      <header className="mb-10 max-md:mb-8">
        <p className="m-eyebrow mb-2.5">{t('teaching.eyebrow')}</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[rgb(var(--foreground))] type-h1">
          {t('teaching.title')}
        </h1>
        <p className="text-[rgb(var(--muted-foreground))] text-lg mt-3 leading-relaxed type-body max-w-3xl">
          {t('teaching.intro')}
        </p>
        {/* Counted from src/lib/teaching.js. The label (dt) comes first in
            the source, as a description list wants; the number is drawn
            above it. */}
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 max-md:mt-6">
          {stats.map(({ key, value }) => (
            <div key={key} className="m-card flex flex-col-reverse gap-1 rounded-2xl border border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))]/60 px-4 py-3.5">
              <dt className="text-xs sm:text-sm text-[rgb(var(--muted-foreground))]">{t(`teaching.stats.${key}`)}</dt>
              <dd className="font-display text-2xl sm:text-3xl font-bold text-[rgb(var(--foreground))] tabular-nums">
                <span dir="ltr">{value}</span>
              </dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Phones: one course at a time. */}
      <div role="group" aria-label={t('teaching.choose_course')} className="md:hidden grid grid-cols-2 gap-1 p-1 mb-5 rounded-full bg-[rgb(var(--muted))]/30 border border-[rgb(var(--border-subtle))]">
        {COURSES.map((course) => (
          <button
            key={course.id}
            type="button"
            aria-pressed={shown === course.id}
            aria-controls={`course-${course.id}`}
            onClick={() => setShown(course.id)}
            className={`press min-h-11 px-3 rounded-full text-sm font-semibold transition-colors ${
              shown === course.id
                ? 'bg-[rgb(var(--primary))] text-[rgb(var(--accent-contrast))]'
                : 'text-[rgb(var(--muted-foreground))]'
            }`}>
            {t(`teaching.courses.${course.id}.short`)}
          </button>
        ))}
      </div>

      <div className="space-y-10 max-md:space-y-0">
        {COURSES.map((course, index) => (
          <Reveal
            as="section"
            key={course.id}
            id={`course-${course.id}`}
            aria-labelledby={`course-${course.id}-title`}
            y={20}
            immediate={index === 0}
            className={`m-card glass-card rounded-2xl border border-[rgb(var(--border))]/60 p-6 md:p-8 scroll-mt-24 ${
              shown === course.id ? '' : 'max-md:hidden'
            }`}>
            {course.kind === 'videos' ? <VideoCourse course={course} /> : <LectureCourse course={course} />}
          </Reveal>
        ))}
      </div>
    </div>
  );
};

const TeachingPage = ({ lang, bundle }) => (
  <SiteShell lang={lang} bundle={bundle}>
    <TeachingContent />
  </SiteShell>
);

export default TeachingPage;
