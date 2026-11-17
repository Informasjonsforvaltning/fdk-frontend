"use client";
import cn from "classnames";
import { useState, type HTMLAttributes } from "react";
import { ToggleGroup, Spinner } from "@digdir/designsystemet-react";
import { SparklesFillIcon } from "@navikt/aksel-icons";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";

import SearchTrayNav from "./search-tray-nav";
import SearchTrayAiSuggestions from "./search-tray-ai-suggestions";
import SearchTrayDocs from "./search-tray-docs";
import SearchTraySuggestions from "./search-tray-suggestions";
import styles from "./search-input-tray.module.scss";

export type SearchTrayPanel = "catalogs" | "docs" | "ai";

const CATALOGS_PANEL: SearchTrayPanel = "catalogs";
const DOCS_PANEL: SearchTrayPanel = "docs";
const AI_PANEL: SearchTrayPanel = "ai";

export type SearchInputTrayProps = HTMLAttributes<HTMLDivElement> & {
  isVisible: boolean;
  loading?: boolean;
  locale: LocaleCodes;
  query?: string;
  onSuggestionSelect?: () => void;
  showTrayNav?: boolean;
  /** Hides the AI panel. Used by the transportportal profile. */
  hideAiSet?: boolean;
  /** Initial toggle panel. */
  defaultTrayPanel?: SearchTrayPanel;
};

const SearchInputTray = ({
  className,
  isVisible,
  loading,
  locale,
  query = "",
  onSuggestionSelect,
  showTrayNav,
  hideAiSet = false,
  defaultTrayPanel = CATALOGS_PANEL,
  ...props
}: SearchInputTrayProps) => {
  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length > 0;
  const [activePanel, setActivePanel] = useState(defaultTrayPanel);
  const dictionary = getLocalization(locale).searchPage;
  // Stay mounted while the query is set. The tray root is hidden when closed.
  const showResults = hasQuery;

  return (
    <div
      className={cn(styles.tray, className, { [styles.visible]: isVisible })}
      {...props}
    >
      {loading && !hasQuery && (
        <div className={styles.spinnerContainer}>
          <Spinner
            data-size="sm"
            aria-hidden="true"
          />
        </div>
      )}
      {showTrayNav && !loading && !hasQuery && (
        <div className={styles.trayContent}>
          <SearchTrayNav locale={locale} />
        </div>
      )}
      {showResults && (
        <div className={styles.trayContent}>
          <ToggleGroup
            className={styles.toggle}
            variant="secondary"
            data-size="sm"
            value={activePanel}
            onChange={(value) => {
              if (value === CATALOGS_PANEL || value === DOCS_PANEL || value === AI_PANEL) setActivePanel(value);
            }}
            aria-label={dictionary.searchSets.ariaLabel}
          >
            <ToggleGroup.Item value={CATALOGS_PANEL}>{dictionary.searchInput.dataCatalogs}</ToggleGroup.Item>
            <ToggleGroup.Item value={DOCS_PANEL}>{dictionary.searchSets.docs}</ToggleGroup.Item>
            {!hideAiSet && (
              <ToggleGroup.Item value={AI_PANEL}>
                <SparklesFillIcon /> {dictionary.searchInput.aiSearch}
              </ToggleGroup.Item>
            )}
          </ToggleGroup>
          <div
            className={styles.panel}
            hidden={activePanel !== CATALOGS_PANEL}
          >
            <SearchTraySuggestions
              locale={locale}
              query={trimmedQuery}
              onSelect={onSuggestionSelect}
            />
          </div>
          <div
            className={styles.panel}
            hidden={activePanel !== DOCS_PANEL}
          >
            <SearchTrayDocs
              locale={locale}
              query={trimmedQuery}
              onSelect={onSuggestionSelect}
            />
          </div>
          {!hideAiSet && (
            <div
              className={styles.panel}
              hidden={activePanel !== AI_PANEL}
            >
              <SearchTrayAiSuggestions
                locale={locale}
                query={trimmedQuery}
                onSelect={onSuggestionSelect}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInputTray;
