import { Locale } from '@fdk-frontend/dictionaries';
import { useRouter } from 'next/navigation';

export const onLanguageSelect = (locale: Locale, router: ReturnType<typeof useRouter>, pathName: string) => {
  if (!pathName) {
    return '/';
  }
  const segments = pathName.split('/');
  segments[1] = locale.code;
  return router.replace(segments.join('/'));
};
