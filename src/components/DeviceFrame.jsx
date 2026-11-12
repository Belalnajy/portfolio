import Image from 'next/image';
import { coverMeta } from '../lib/cover-meta';
import { COVER_RATIO, fitFor } from '../lib/device-frame';

/**
 * One frame for every project picture, so the whole archive reads as one set:
 * the home rows, the /work cards, the details sheet, the case-study hero and
 * gallery, and the LMS suite on /cv all draw their screens through here.
 *
 * - `browser`: a light window bar (three dots and a faint address pill with
 *   the project's host) over the screen. Pure decoration: aria-hidden, no
 *   controls. The pill stays left-to-right text in Arabic, like a real one.
 * - `phone`: a plain rounded body with a thin bezel, no notch, for the `-m`
 *   phone captures.
 * - `bare`: the same rounded edge with no bar, for pictures that are already
 *   composed mockups or illustrations (the registry's `mockups`).
 *
 * The screen sits in a fixed-ratio box, so nothing shifts while it loads.
 * Covers are 1920x1000, which is the default box (96/50) and fills it
 * exactly. The older covers that are close to it fill the box too, losing a
 * sliver at the bottom; the few that are far off (a 1.35:1 or a 2.45:1
 * capture) are shown whole on a quiet backdrop instead of being cropped.
 */

export { COVER_RATIO, hostOf, frameKind, fitFor } from '../lib/device-frame';

const BrowserBar = ({ host }) => (
  <div
    aria-hidden="true"
    className="flex items-center gap-3 h-6 sm:h-7 px-2.5 sm:px-3 border-b border-[rgb(var(--border-subtle))] bg-[rgb(var(--border-subtle))]/45">
    <span className="flex w-9 sm:w-10 shrink-0 gap-1 sm:gap-1.5">
      {[0, 1, 2].map((dot) => (
        <span key={dot} className="size-[7px] sm:size-2 rounded-full bg-[rgb(var(--muted-foreground))]/35" />
      ))}
    </span>
    <span className="flex flex-1 min-w-0 justify-center">
      <span
        dir="ltr"
        className="block w-full max-w-[15rem] h-4 sm:h-[1.125rem] px-3 rounded-full bg-[rgb(var(--background))]/70 text-center text-[9px] sm:text-[10px] leading-4 sm:leading-[1.125rem] font-medium text-[rgb(var(--muted-foreground))] truncate">
        {host}
      </span>
    </span>
    {/* Balances the dots, so the pill sits in the true centre. */}
    <span className="w-9 sm:w-10 shrink-0" />
  </div>
);

/**
 * Props
 * - `src`, `alt`, `sizes`: as for next/image. `sizes` must describe the
 *   rendered width of the screen, so the browser picks a sharp enough file.
 * - `kind`: 'browser' (default), 'phone' or 'bare'.
 * - `host`: shown in the browser bar's address pill.
 * - `ratio`: the screen box, width / height. Defaults to the cover ratio;
 *   pass 'natural' to use the picture's own (gallery captures, phones).
 * - `preload`: the page's LCP image only. Fetched with the document.
 * - `className`: the outer frame; `imageClassName`: the <img>.
 * - `style`: the outer frame (a view-transition name goes here).
 * - `alignBar`: in a grid of frames, a bare frame keeps an empty band where
 *   the bar would be, so its screen and the title under it line up with the
 *   browser-framed neighbours.
 */
const DeviceFrame = ({
  src,
  alt,
  sizes,
  kind = 'browser',
  host = '',
  ratio = COVER_RATIO,
  preload = false,
  className = '',
  imageClassName = '',
  style,
  alignBar = false,
}) => {
  const meta = coverMeta(src);
  const box = ratio === 'natural' ? meta.w / meta.h : ratio;
  const fit = fitFor(meta, box);
  const phone = kind === 'phone';

  const screen = (
    <div
      className={`relative overflow-hidden ${box === COVER_RATIO ? 'aspect-[96/50]' : ''} ${
        fit === 'contain' ? 'bg-[rgb(var(--muted))]/60' : ''
      } ${phone ? 'rounded-[1.4rem]' : ''}`}
      style={box === COVER_RATIO ? undefined : { aspectRatio: `${meta.w} / ${meta.h}` }}>
      <Image
        src={src}
        alt={alt}
        width={meta.w}
        height={meta.h}
        sizes={sizes}
        placeholder={meta.blur ? 'blur' : 'empty'}
        blurDataURL={meta.blur}
        {...(preload && { preload: true, fetchPriority: 'high' })}
        // A filled screen keeps its top (the header of the site); a picture
        // shown whole sits in the middle of the box.
        style={{ objectFit: fit, objectPosition: fit === 'cover' ? 'top' : 'center' }}
        className={`absolute inset-0 h-full w-full ${imageClassName}`}
      />
    </div>
  );

  if (phone) {
    return (
      <div
        style={style}
        className={`rounded-[1.75rem] p-1.5 bg-[rgb(var(--scrim))] ring-1 ring-[rgb(var(--border-control))]/40 shadow-xl ${className}`}>
        {screen}
      </div>
    );
  }

  const frame = (
    <div
      style={style}
      className={`overflow-hidden rounded-xl border border-[rgb(var(--border-subtle))] bg-[rgb(var(--surface))] shadow-[0_18px_48px_-24px_rgb(var(--scrim)/0.55)] ${className}`}>
      {kind === 'browser' && <BrowserBar host={host} />}
      {screen}
    </div>
  );

  if (kind === 'bare' && alignBar) {
    return (
      <div>
        {/* The bar's height: 24px (28px from sm) plus its 1px rule. */}
        <div aria-hidden="true" className="h-[25px] sm:h-[29px]" />
        {frame}
      </div>
    );
  }

  return frame;
};

export default DeviceFrame;
