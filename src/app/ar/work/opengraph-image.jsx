import { FACTS } from '../../../lib/facts';
import { pageOgImage, OG_SIZE, OG_CONTENT_TYPE } from '../../../lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Work | Belal Nagy';

export default function Image() {
  return pageOgImage('Work', `The complete archive: ${FACTS.archive} projects, ${FACTS.projects} of them for clients across Egypt and the Gulf.`);
}
