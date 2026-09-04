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
  showTrayNav?: boolean;
};

const SearchInputTray = ({
  className,
  isVisible,
  loading,
  locale,
  query = "",
  onSuggestionSelect,
  showTrayNav,
  ...props
}: SearchInputTrayProps) => {
  const hasQuery = query.trim().length > 0;

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
        <SearchTrayNav
          className={styles.trayContent}
          locale={locale}
        />
      )}
      {isVisible && hasQuery && (
        <div className={styles.trayContent}>
          <SearchSuggestions
            query={query}
            locale={locale}
            onSelect={onSuggestionSelect}
          />
        </div>
      )}
    </div>
  );
};

export default SearchInputTray;
