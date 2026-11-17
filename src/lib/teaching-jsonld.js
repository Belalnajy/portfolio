import { SITE_URL, PERSON_REF, WEBSITE_ID } from './site';
import { COURSES } from './teaching';
import en from '../locales/en';
import ar from '../locales/ar';

const ITI = {
  '@type': 'EducationalOrganization',
  name: 'Information Technology Institute (ITI)',
  url: 'https://iti.gov.eg',
};

/**
 * Structured data for /teaching: the page as a collection of the two
 * courses, each taught by Belal (the site-wide Person) at ITI.
 */
export const teachingJsonLd = (lang = 'en') => {
  const copy = (lang === 'ar' ? ar : en).translation.teaching;
  const url = `${SITE_URL}${lang === 'ar' ? '/ar' : ''}/teaching`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    url,
    name: copy.title,
    inLanguage: lang,
    isPartOf: { '@id': WEBSITE_ID },
    author: PERSON_REF,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: COURSES.length,
      itemListElement: COURSES.map((course, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Course',
          '@id': `${url}#course-${course.id}`,
          url: `${url}#course-${course.id}`,
          name: copy.courses[course.id].title,
          description: copy.courses[course.id].desc,
          provider: ITI,
          instructor: PERSON_REF,
        },
      })),
    },
  };
};
