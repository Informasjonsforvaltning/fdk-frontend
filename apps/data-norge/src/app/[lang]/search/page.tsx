import { getSearchPageMetadata, type SearchPageHandlerProps } from "./search-page-handler";

/** Search UI is rendered by SearchPageClient so it does not remount on set change. */
export default function Page() {
  return null;
}

export const generateMetadata = (props: SearchPageHandlerProps) => getSearchPageMetadata(props);
