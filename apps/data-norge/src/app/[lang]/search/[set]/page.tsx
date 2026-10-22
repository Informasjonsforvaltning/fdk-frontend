import { redirect } from "next/navigation";
import { getSearchPageMetadata, type SearchPageHandlerProps } from "../search-page-handler";
import { isSearchSetPathSegment } from "@fdk-frontend/utils";

/** Validates the set path segment and redirects if invalid. Search UI is rendered by the search layout (SearchPageClient) so it does not remount on set change. */
export default async function Page(props: SearchPageHandlerProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const locale = params.lang ?? "nb";
  const query = typeof searchParams.q === "string" ? searchParams.q : undefined;

  if (!isSearchSetPathSegment(params.set)) {
    const base = `/${locale}/search`;
    const qs = query ? `?q=${encodeURIComponent(query)}` : "";
    redirect(`${base}${qs}`);
  }

  return null;
}

export const generateMetadata = (props: SearchPageHandlerProps) => getSearchPageMetadata(props);
