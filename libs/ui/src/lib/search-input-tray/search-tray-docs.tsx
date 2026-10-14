"use client";
import { type LocaleCodes } from "@fdk-frontend/localization";

import NavLinkList from "../nav-link-list";
import { buildTraySetHref, SearchTraySeeAll, TrayPanelStatus } from "./search-tray-panel";
import { fetchTrayJson, isTrayRecord, useDebouncedTrayFetch } from "./use-debounced-tray-fetch";

type SearchTrayDoc = {
  id: string;
  title: string;
  url: string;
};

const readDocs = (value: unknown): SearchTrayDoc[] => {
  if (!isTrayRecord(value) || !Array.isArray(value.results)) return [];
  return value.results.flatMap((item) => {
    if (!isTrayRecord(item)) return [];
    if (typeof item.id !== "string" || typeof item.title !== "string" || typeof item.url !== "string") return [];
    return [{ id: item.id, title: item.title, url: item.url }];
  });
};

const getDocsUrl = (locale: LocaleCodes, query: string): string => {
  const params = new URLSearchParams({ q: query, lang: locale, size: "5" });
  return `/api/docs-search?${params.toString()}`;
};

const fetchDocsHits = async (url: string, signal: AbortSignal): Promise<SearchTrayDoc[]> => {
  try {
    return readDocs(await fetchTrayJson(url, signal));
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") throw err;
    return [];
  }
};

export type SearchTrayDocsProps = {
  locale: LocaleCodes;
  query: string;
  onSelect?: () => void;
};

const SearchTrayDocs = ({ locale, query, onSelect }: SearchTrayDocsProps) => {
  const { ready, data } = useDebouncedTrayFetch(query, locale, (nextQuery, signal) =>
    fetchDocsHits(getDocsUrl(locale, nextQuery), signal),
  );
  const docs = data ?? [];

  return (
    <TrayPanelStatus
      locale={locale}
      ready={ready}
      empty={docs.length === 0}
    >
      <NavLinkList
        items={docs.map((doc) => ({
          id: doc.id,
          href: doc.url,
          label: doc.title,
          onClick: onSelect,
        }))}
      />
      <SearchTraySeeAll
        href={buildTraySetHref(locale, "docs", query)}
        locale={locale}
        onSelect={onSelect}
      />
    </TrayPanelStatus>
  );
};

export default SearchTrayDocs;
