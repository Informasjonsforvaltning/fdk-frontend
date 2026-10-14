"use client";

import React, { useRef, useState } from "react";
import cn from "classnames";
import dynamic from "next/dynamic";

import { type Localization, type LocaleCodes } from "@fdk-frontend/localization";
import { Heading } from "@digdir/designsystemet-react";
import { HeadingWithDivider, SearchInput } from "@fdk-frontend/ui";

import Norgeskart from "./components/norgeskart";
import ScrollButton from "./components/scroll-button";

import styles from "./frontpage-banner.module.scss";

const QuerySuggestion = dynamic(() => import("./components/query-suggestion"), { ssr: false });

type FrontpageBannerProps = {
  dictionary: Localization;
  locale: LocaleCodes;
};

const FrontpageBanner = ({ dictionary, locale }: FrontpageBannerProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(styles.outer)}
      id="frontpage-banner"
    >
      <div className={styles.inner}>
        <HeadingWithDivider
          level={1}
          className={styles.headline}
        >
          {dictionary.aiBanner.title}
        </HeadingWithDivider>
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
      </div>
      <div className={styles.gradient} />
      <Norgeskart />
      <ScrollButton />
    </div>
  );
};

export { FrontpageBanner };
