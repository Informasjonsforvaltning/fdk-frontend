"use client";
import cn from "classnames";
import { type HTMLAttributes } from "react";
import { Spinner } from "@digdir/designsystemet-react";
import { type LocaleCodes } from "@fdk-frontend/localization";

import SearchTrayNav from "../search-tray-nav";
import SearchSuggestions from "./search-suggestions";
import styles from "./search-input-tray.module.scss";

export type SearchInputTrayProps = HTMLAttributes<HTMLDivElement> & {
  isVisible: boolean;
  loading?: boolean;
  locale: LocaleCodes;
  query?: string;
  onSuggestionSelect?: () => void;
};

const SearchInputTray = ({
  className,
  isVisible,
  loading,
  locale,
  query = "",
  onSuggestionSelect,
  ...props
}: SearchInputTrayProps) => {
  const hasQuery = query.trim().length > 0;

  return (
    <div
      className={cn(styles.tray, className, { [styles.visible]: isVisible })}
      {...props}
    >
      <div className={styles.trayContent}>
        {loading && !hasQuery && (
          <div className={styles.spinnerContainer}>
            <Spinner
              data-size="sm"
              aria-hidden="true"
            />
          </div>
        )}
        {!loading && !hasQuery && <SearchTrayNav locale={locale} />}
        {isVisible && hasQuery && (
          <SearchSuggestions
            query={query}
            locale={locale}
            onSelect={onSuggestionSelect}
          />
        )}
      </div>
    </div>
  );
};

export default SearchInputTray;
