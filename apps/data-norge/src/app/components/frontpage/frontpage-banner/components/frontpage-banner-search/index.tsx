"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";

import { Heading } from "@digdir/designsystemet-react";
import { type Localization, type LocaleCodes } from "@fdk-frontend/localization";
import { SearchInput } from "@fdk-frontend/ui";

import styles from "./frontpage-banner-search.module.scss";

const QuerySuggestion = dynamic(() => import("../query-suggestion"), { ssr: false });

type FrontpageBannerSearchProps = {
  dictionary: Localization;
  locale: LocaleCodes;
};

const FrontpageBannerSearch = ({ dictionary, locale }: FrontpageBannerSearchProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div
      className={styles.search}
      data-color-scheme="dark"
    >
      <Heading level={2}>{dictionary.aiBanner.prompt.label}</Heading>
      <SearchInput
        locale={locale}
        className={styles.searchInput}
        value={query}
        onChange={setQuery}
        defaultTrayPanel="ai"
        inputRef={inputRef}
        placeholder={dictionary.aiBanner.prompt.placeholder}
      />
      <QuerySuggestion
        dictionary={dictionary}
        onClick={handleSuggestion}
      />
    </div>
  );
};

export { FrontpageBannerSearch };
