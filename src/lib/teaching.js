/**
 * The /teaching page's data: Belal's course material at ITI, as it sits on
 * his Google Drive. Every folder and file below is shared "anyone with the
 * link (viewer)", so the links open without signing in.
 *
 * Taken from a read-only inventory of the two Drive folders (2026-11-17).
 * Only ids, the order and the topics are kept here; the wording is in the
 * locale bundles under `teaching.*`. Drive does not report video durations,
 * so none are shown. Individual code files are not listed (the lecture
 * folder holds them), and neither are the loose lab screenshots or the
 * sample users.json in CST lecture 6.
 *
 * Adding a lecture: add its Drive ids here and its topic under
 * `teaching.topics.<id>` in both locale files (tests/unit/teaching.test.mjs
 * checks the pairing).
 */

export const driveFolder = (id) => `https://drive.google.com/drive/folders/${id}`;
export const driveFile = (id) => `https://drive.google.com/file/d/${id}/view`;
/** The embeddable player; loaded only when someone presses play. */
export const drivePreview = (id) => `https://drive.google.com/file/d/${id}/preview`;

/**
 * 1. Recorded lectures: HTML4, CSS2, JavaScript and ES6, 19 videos in four
 * sections, recorded July to September 2026. `file` is the name on Drive,
 * shown as a secondary label; the files are numbered by part within each
 * section, in the order they were taught.
 */
const VIDEO_COURSE = {
  id: 'videos',
  kind: 'videos',
  folder: '1Jc-12iDh5OeU0UUMfic-ASAgl4NJQ8E5',
  sections: [
    {
      id: 'html4',
      folder: '15QULrw4sjWRrJspnd5kqcMvagqaHIFeM',
      videos: [
        { file: 'HTML4-Lecture1', drive: '1x-AM6ww0ytZHX-pzkOOVDqwl6ys1zKX0' },
        { file: 'Lecture2.1', drive: '1dsGM7x8TH_VcGeNhAMfNQaS5_yWh7bAU' },
        { file: 'Lecture2.2', drive: '1WGTOpeo01X2PJg_Q9gPJDB3-ydVYqT9Y' },
      ],
    },
    {
      id: 'css',
      folder: '1c86FxH8SiBVCZJ8EpELFBgI-AUhkmz1K',
      videos: [
        { file: 'CSS2-1', drive: '1Qs2p0Zm4kS-46HcnRqH8VxkdNyomVd1w' },
        { file: 'CSS2-2', drive: '1H6e2sKCiekRnM7xt_zf5_Y00aHfRrHx9' },
      ],
    },
    {
      id: 'javascript',
      folder: '1Eb5kzntNFzUam08kT4u9f207pRhLJDoU',
      videos: [
        { file: 'JavaScript5-1', drive: '1nxSUFdCFtJxaR8YI3BtqsSLye3QSZ6Hd' },
        { file: 'JavaScript5-1.1', drive: '1bTWf-Zx8myHjCE1sZ4_j98g0vuKhvDCo' },
        { file: 'JavaScript5-2', drive: '1qBf3S40FMBsCfaXxMp3-_KdsZcyziIfY' },
        { file: 'JavaScript5-2.2', drive: '1wP5L7umk2OYNu07iuFUdgqlTmxkmKw8v' },
        { file: 'Lecture3', drive: '1wqMuEngJ7OoPOlxTXYE4rQZRcMLEF-2i' },
        { file: 'Lecture4', drive: '18aPIXCVhcHYk-Jt1trKkPr8V-TwkukPQ' },
        { file: 'Lecture4.1', drive: '1rapJRZSSgfQdrhcdXOF_pLa8QtTmmLwy' },
        { file: 'Lecture5', drive: '165dlrzYNwiLwaFpgF3LAlUZL3Ha0_bgW' },
      ],
    },
    {
      id: 'es6',
      folder: '1pHI0BNU8QH9uGI84vpY_R1_82xXC8MoB',
      videos: [
        { file: 'ES6-1', drive: '1FdeWGI_3v32xq549tbkEj4PZAQjF9Kk7' },
        { file: 'ES6-1.2', drive: '1zdHqmx82wmNGxG-bTcROo3YSou-zWJOq' },
        { file: 'ES6-2.1', drive: '1xZZDu-x1asC0NKxMD2XAu_ARR4pSzuWQ' },
        { file: 'ES6-2.2', drive: '1ePsncNeW5TTGQvz5aWawwLw71T9ffLmg' },
        { file: 'ES6-3', drive: '1ombZBbd0kBenmrQRUSm-nSg_mJsiKpJY' },
        { file: 'ES6-3.1', drive: '1Lw2aTrkFfUoHUFetfb_S0cEmWWf2gVmd' },
      ],
    },
  ],
};

/**
 * 2. CST (Client-Side Technologies) for the 2026 Vue/React track: eight
 * lectures, each with its deck as a PDF (`slides`) and a folder of the
 * demos written in class and the lab (`folder`). Lecture 7's lab includes
 * one short video (`labVideo`).
 */
const CST_COURSE = {
  id: 'cst',
  kind: 'lectures',
  folder: '1Oz4Y8jvWQCsK31ooicBsWc0Q7GnzI5cd',
  lectures: [
    { id: 'cst1', folder: '1BgDgb31Ctmyu2k5thcdi04fzz_JZYC6f', slides: '1wxDVRXR40TYy9Kj0epa6ch-fX9CHRF3V' },
    { id: 'cst2', folder: '114Zfgexr35y3s90tzXeulgk148UZYSGP', slides: '1yDL0axf0XmKx8JA5hTNkYz-pYlFugEpI' },
    { id: 'cst3', folder: '1-6FrVExQWWissJepCty4K26RRp-2_tom', slides: '1jk0Vx3uSzx-DnReNqOu2tBg87JQ_3heq' },
    { id: 'cst4', folder: '1sGnKGQmsIRuUs0Xk4ELAVaH2DMuNcKRr', slides: '1Ky3YUMZBMY1A2KatBxqWS3RKfHjyZBtr' },
    { id: 'cst5', folder: '1zLS9QTqu9FNcA2KUYTf9IQuCySQ6aYMa', slides: '1Pt-NKggTvEI97pKQMYlprQixF_ZaCH47' },
    { id: 'cst6', folder: '1EPwPjqpy3g_CzRqcdiM2L7k9_qUBzmjF', slides: '1JRacjdpHAOSg7NBc3vza3Ikkq-Y6s4tE' },
    { id: 'cst7', folder: '18emWyLIavKKX6k2d7G-fs6Dlr4cU2LPm', slides: '1qmeXfqTgykesUeVxqhXgb1TPqBFLRRuL', labVideo: '179hf4CnPHN3EKDLvTW1n0C2l9CodHVgL' },
    { id: 'cst8', folder: '1fK5v8qpcjNPjtcHq9m3FYiGGa74K1XNr', slides: '1sd4O_x9_4zVEgRWyEdZiEWiikUySK0n6' },
  ],
};

export const COURSES = [VIDEO_COURSE, CST_COURSE];

/** Every video of the first course, numbered 1–19 across its sections. */
export const VIDEOS = VIDEO_COURSE.sections.flatMap((section) =>
  section.videos.map((video, part) => ({ ...video, section: section.id, part: part + 1 })),
).map((video, index) => ({ ...video, number: index + 1 }));

/**
 * The stats line. Counted from the data above, except the code files, which
 * are not listed here: the inventory has 60 demo and lab code files across
 * the eight CST lecture folders, plus task sheets, hence "60+".
 */
export const TEACHING_STATS = {
  courses: COURSES.length,
  lectures: VIDEOS.length + CST_COURSE.lectures.length,
  videos: VIDEOS.length,
  decks: CST_COURSE.lectures.filter((lecture) => lecture.slides).length,
  codeFiles: 60,
};
