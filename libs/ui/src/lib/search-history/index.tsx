"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Button, Heading } from "@digdir/designsystemet-react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { getLocalization, interpolate, type LocaleCodes } from "@fdk-frontend/localization";
import { isSearchSetPathSegment } from "@fdk-frontend/utils";

import NavLinkList from "../nav-link-list";
import { readSearchHistory, rememberSearchUrl, searchHistorySuffix, writeSearchHistory } from "./search-history";
import styles from "./search-history.module.scss";

export type SearchHistoryProps = {
  lang: LocaleCodes;
};

const SearchHistory = ({ lang }: SearchHistoryProps) => {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const query = new URLSearchParams(search).get("q")?.trim() ?? "";
  const previousQuery = useRef<string | null>(null);
  const [history, setHistory] = useState<readonly string[]>([]);
  const [ready, setReady] = useState(false);
  const dictionary = getLocalization(lang).searchPage.searchHistory;
  const setLabels = getLocalization(lang).searchPage.searchSets;

  useEffect(() => {
    const stored = readSearchHistory();
    const previous = previousQuery.current;
    previousQuery.current = query;
    const queryChanged = previous === null || previous.toLocaleLowerCase("nb") !== query.toLocaleLowerCase("nb");

    if (!queryChanged || !query) {
      setHistory(stored);
      setReady(true);
      return;
    }

    const suffix = searchHistorySuffix(pathname, search);
    const next = suffix ? rememberSearchUrl(stored, suffix) : stored;
    if (next !== stored) writeSearchHistory(next);
    setHistory(next);
    setReady(true);
  }, [pathname, search, query]);

  if (!ready || history.length === 0) return null;

  const updateHistory = (next: readonly string[]) => {
    writeSearchHistory(next);
    setHistory(next);
  };

  const labelFor = (entry: string): string => {
    const question = entry.indexOf("?");
    const entryQuery = new URLSearchParams(question === -1 ? "" : entry.slice(question + 1)).get("q")?.trim() ?? "";
    if (entryQuery) return entryQuery;

    const setId = (question === -1 ? entry : entry.slice(0, question)).replace(/^\//, "");
    if (isSearchSetPathSegment(setId)) {
      const setLabel = setLabels[setId];
      if (typeof setLabel === "string") return setLabel;
    }
    return setId || entry.replace(/^\?/, "");
  };

  return (
    <div>
      <Heading
        className={styles.heading}
        level={3}
        data-size="xs"
      >
        {dictionary.heading}
      </Heading>
      <NavLinkList
        items={history.map((entry) => {
          const label = labelFor(entry);
          return {
            id: entry.toLocaleLowerCase("nb"),
            href: `/${lang}/search${entry}`,
            label,
            action: (
              <Button
                type="button"
                variant="tertiary"
                data-size="sm"
                aria-label={interpolate(dictionary.delete, { query: label })}
                onClick={() =>
                  updateHistory(
                    history.filter((item) => item.toLocaleLowerCase("nb") !== entry.toLocaleLowerCase("nb")),
                  )
                }
              >
                <XMarkIcon aria-hidden />
              </Button>
            ),
          };
        })}
      />
      <Button
        className={styles.clear}
        type="button"
        variant="secondary"
        data-size="sm"
        onClick={() => updateHistory([])}
      >
        {dictionary.clear}
      </Button>
    </div>
  );
};

export default SearchHistory;
