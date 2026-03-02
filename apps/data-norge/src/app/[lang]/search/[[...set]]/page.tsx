import { redirect } from 'next/navigation';
import {
  getSearchPageMetadata,
  type SearchPageHandlerProps,
} from '../search-page-handler';
import { isValidSetSegment } from '../search-set-config';
import SearchPageClient from '../../../components/search-page/search-page-client';

/** Handles /[lang]/search (set undefined = KI) and /[lang]/search/[set]. Data is fetched client-side; no server data loading. */
export default async function Page(props: SearchPageHandlerProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const locale = params.lang ?? 'nb';
  const query = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  const firstSegment = params.set?.[0];

  if (firstSegment !== undefined && !isValidSetSegment(firstSegment)) {
    const base = `/${locale}/search`;
    const qs = query ? `?q=${encodeURIComponent(query)}` : '';
    redirect(`${base}${qs}`);
  }

  return <SearchPageClient lang={locale} />;
}

export const generateMetadata = (props: SearchPageHandlerProps) =>
  getSearchPageMetadata(props);