"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useRef, useEffect, useState, type FormEvent } from "react";
import cn from "classnames";
import { Tag, Search } from "@digdir/designsystemet-react";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";

import SearchInputTray from "../search-input-tray";
import { buildSearchPageQueryUrl } from "../search-form/search-page-url";
import styles from "./search-input.module.scss";

export type SearchInputProps = {
  /** Controlled value. Omit to use internal state (uncontrolled). */
  value?: string;
  /** Controlled change handler. Omit when using internal state. */
  onChange?: (value: string) => void;
  searchLabel?: string;
  placeholder?: string;
  className?: string;
  locale: LocaleCodes;
  loading?: boolean;
  showTrayNav?: boolean;
};

const getInitialQFromUrl = function getInitialQFromUrl(searchParams: URLSearchParams): string {
  const q = searchParams.get("q");
  if (q === null || q === "") return "";
  try {
    return decodeURIComponent(q);
  } catch {
    return q;
  }
};

const SearchInput = ({
  value: controlledValue,
  onChange: controlledOnChange,
  searchLabel,
  placeholder,
  className,
  locale,
  loading,
  showTrayNav = true,
  ...rest
}: SearchInputProps) => {
  const inputDict = getLocalization(locale).searchPage.searchInput;
  const resolvedSearchLabel = searchLabel ?? inputDict.label;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMac, setIsMac] = useState(false);
  const [isTrayVisible, setIsTrayVisible] = useState(false);
  const [internalValue, setInternalValue] = useState(() => getInitialQFromUrl(searchParams));

  // Keep uncontrolled value in sync when URL q param changes (e.g. back/forward)
  useEffect(() => {
    if (controlledValue === undefined) {
      setInternalValue(getInitialQFromUrl(searchParams));
    }
  }, [searchParams, controlledValue]);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const setValue = isControlled ? (controlledOnChange ?? (() => undefined)) : setInternalValue;

  useEffect(() => {
    setIsMac(typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (!containerRef.current?.contains(target)) {
        setIsTrayVisible(false);
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      if (!containerRef.current?.contains(target)) {
        setIsTrayVisible(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("focusin", handleFocusIn, true);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("focusin", handleFocusIn, true);
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTrayVisible(false);
    router.push(
      buildSearchPageQueryUrl({
        pathname,
        locale,
        searchParams,
        query: value,
      }),
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(styles.container, className)}
    >
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        {...rest}
      >
        <Search className={cn(styles.search, className, { [styles.visible]: isTrayVisible })}>
          <Search.Input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsTrayVisible(true)}
            className={styles.input}
            aria-label={resolvedSearchLabel}
          />
          {value && <Search.Clear className={styles.searchCancelBtn} />}
          {(isTrayVisible || value) && (
            <Search.Button
              type="submit"
              className={styles.searchBtn}
              variant="secondary"
            >
              Søk
            </Search.Button>
          )}
        </Search>
        {!isTrayVisible && !value && (
          <Tag
            className={styles.hotkeyTag}
            data-size="sm"
            data-color="neutral"
          >
            {isMac ? "⌘ + K" : "Ctrl + K"}
          </Tag>
        )}
      </form>
      <SearchInputTray
        isVisible={isTrayVisible}
        loading={loading}
        locale={locale}
        query={value}
        onSuggestionSelect={() => setIsTrayVisible(false)}
        showTrayNav={showTrayNav}
      />
    </div>
  );
};

export default SearchInput;
