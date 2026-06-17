"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Textfield, Button, ValidationMessage } from "@digdir/designsystemet-react";
import { ShieldLockIcon, SparklesIcon } from "@navikt/aksel-icons";
import { type Localization, type LocaleCodes } from "@fdk-frontend/localization";
import { llmSearch, type LlmSearchResponse } from "@fdk-frontend/data-access";
import { AdvancedSearchPrompt } from "./components/advanced-search-prompt";

import { ResultItem, type ItemObjectType } from "./components/result-item";
import AuxPanel from "./components/aux-panel";

import styles from "./llm-search.module.scss";

type LlmSearchProps = {
  endpoint: string;
  dictionary: Localization;
  locale: LocaleCodes;
};

const MotionDiv = motion.div;
const MotionUl = motion.ul;

const LlmSearch = ({ endpoint, dictionary, locale }: LlmSearchProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<LlmSearchResponse | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const animations = {
    resultsContainer: {
      hidden: { height: 0 },
      show: { height: "auto", transition: { duration: 0.15 } },
    },
    resultsList: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    resultsItem: {
      hidden: { opacity: 0, scale: 0.9 },
      show: { opacity: 1, scale: 1 },
    },
  };

  const validate = (q: string) => {
    if (!q || q.length < 3) {
      setError(dictionary.aiBanner.prompt.errors.queryTooShort);
      return false;
    }

    if (q && q.length > 255) {
      setError(dictionary.aiBanner.prompt.errors.queryTooLong);
      return false;
    }

    setError(undefined);
    return true;
  };

  const submitQuery = async (e: any, overrideStateQuery?: string) => {
    if (e) e.preventDefault();

    const queryToSubmit = overrideStateQuery || query;

    if (!validate(queryToSubmit)) return;

    setLoading(true);

    try {
      const response = await llmSearch(endpoint, queryToSubmit);
      setResults(response);
      setError(undefined);
    } catch (err) {
      if (err instanceof Error && err.message === "Request timed out") {
        setError("Request timed out");
      } else {
        // Log the error for debugging
        console.warn("LLM search error:", err);
        setError(dictionary.aiBanner.prompt.errors.generic);
      }
    } finally {
      setLoading(false);
    }
  };

  const doSearch = (value: string) => {
    setQuery(value);
    submitQuery(null, value);
  };

  return (
    <div className={styles.llmSearch}>
      <form onSubmit={submitQuery}>
        <label
          htmlFor="llm-search-input"
          id="llm-search-label"
          className={styles.llmInputLabel}
        >
          {dictionary.aiBanner.prompt.label}
        </label>
        <div className={`${styles.llmSearchBox} ${loading ? styles.loading : ""}`}>
          <div className={styles.inputRow}>
            <Textfield
              id="llm-search-input"
              aria-labelledby="llm-search-label"
              className={styles.llmInputTextfield}
              placeholder={dictionary.aiBanner.prompt.placeholder}
              data-size="lg"
              value={query}
              error={error !== undefined}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              data-color-scheme="dark"
            />
            <Button
              className={styles.llmSearchButton}
              type="submit"
              data-size="sm"
              disabled={loading}
            >
              <SparklesIcon
                className={styles.llmSearchIcon}
                aria-hidden
              />
              <span>{dictionary.aiBanner.prompt.button}</span>
            </Button>
            <span
              role="status"
              aria-live="polite"
              className={styles.srOnly}
            >
              {loading ? dictionary.aiBanner.prompt.loading : ""}
            </span>
          </div>
          <p className={styles.disclaimer}>
            <ShieldLockIcon
              className={styles.disclaimerIcon}
              aria-hidden
            />
            {dictionary.aiBanner.prompt.disclaimer}
          </p>
        </div>
      </form>
      {!error && !loading && (
        <AuxPanel
          dictionary={dictionary}
          numResults={results?.hits?.length}
          onRequestSearch={(value: string) => doSearch(value)}
          locale={locale}
        />
      )}
      {error && !loading && (
        <div className={styles.status}>
          <ValidationMessage
            aria-hidden
            className={styles.ValidationMessage}
            data-size="sm"
          >
            {error}
          </ValidationMessage>
        </div>
      )}
      {results && !loading && (
        <MotionDiv
          className={styles.llmResults as string}
          variants={animations.resultsContainer}
          initial="hidden"
          animate="show"
        >
          <MotionUl
            className={styles.llmResultsList}
            variants={animations.resultsList}
            initial="hidden"
            animate="show"
          >
            {results.hits &&
              results.hits.map((item: ItemObjectType, i: number) => (
                <motion.li
                  key={`item-${i}`}
                  variants={animations.resultsItem}
                >
                  <ResultItem
                    item={item}
                    locale={locale}
                  />
                </motion.li>
              ))}
            <motion.li variants={animations.resultsItem}>
              <AdvancedSearchPrompt
                dictionary={dictionary}
                locale={locale}
              />
            </motion.li>
          </MotionUl>
        </MotionDiv>
      )}
    </div>
  );
};

export default LlmSearch;
