"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useRef, useEffect, useState, type FormEvent, type Ref } from "react";
import cn from "classnames";
import { Search } from "@digdir/designsystemet-react";
import { getLocalization, type LocaleCodes } from "@fdk-frontend/localization";

import SearchInputTray, { type SearchTrayPanel } from "../search-input-tray";
import { buildSearchPageQueryUrl } from "@fdk-frontend/utils";
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
  /** Hides the AI panel in the tray. Used by the transportportal profile. */
  hideAiSet?: boolean;
  /** Initial tray panel. */
  defaultTrayPanel?: SearchTrayPanel;
  /** Search field, so callers can focus it. */
  inputRef?: Ref<HTMLInputElement>;
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
  hideAiSet = false,
  defaultTrayPanel,
  inputRef: inputRefProp,
  ...rest
}: SearchInputProps) => {
  const dictionary = getLocalization(locale);
  const inputDict = dictionary.searchPage.searchInput;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const setInputRef = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof inputRefProp === "function") {
      inputRefProp(node);
      return;
    }
    if (inputRefProp) inputRefProp.current = node;
  };
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
    // The field stays mounted on the search page. Leave it focused and the next
    // click does not fire onFocus, so the tray stays shut.
    inputRef.current?.blur();
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
      data-color-scheme={isTrayVisible ? "light" : null}
    >
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        {...rest}
      >
        <Search
          className={cn(styles.search, {
            [styles.visible]: isTrayVisible,
          })}
        >
          <Search.Input
            ref={setInputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsTrayVisible(true)}
            aria-label={inputDict.label}
            placeholder={placeholder}
          />
          <Search.Clear />
        </Search>
      </form>
      <SearchInputTray
        isVisible={isTrayVisible}
        loading={loading}
        locale={locale}
        query={value}
        onSuggestionSelect={() => setIsTrayVisible(false)}
        showTrayNav={showTrayNav}
        hideAiSet={hideAiSet}
        defaultTrayPanel={defaultTrayPanel}
      />
    </div>
  );
};

export default SearchInput;
