'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Textfield, Button, Spinner, ValidationMessage } from '@digdir/designsystemet-react';
import { SparklesIcon } from '@navikt/aksel-icons';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { AdvancedSearchPrompt } from './components/advanced-search-prompt';

import { ResultItem, ItemObjectType } from './components/result-item';
import AuxPanel from './components/aux-panel';

import styles from './llm-search.module.scss';

type LlmSearchProps = {
    endpoint: string;
    dictionary: Dictionary;
    locale: LocaleCodes;
};

const MotionDiv = motion.div;
const MotionUl = motion.ul;

const LlmSearch = ({ endpoint, dictionary, locale }: LlmSearchProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<any>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    const animations = {
        resultsContainer: {
            hidden: { height: 0 },
            show: { height: 'auto', transition: { duration: 0.15 } },
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

        let queryToSubmit = overrideStateQuery || query;

        // temp bugfix: strip "?" from query
        queryToSubmit = queryToSubmit.replace(/\?/g, '');

        if (!validate(queryToSubmit)) return;

        setLoading(true);

        try {
            // Add timeout to prevent hanging
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: queryToSubmit }),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            setLoading(false);

            if (response.status === 200) {
                const json = await response.json();
                setResults(json);
            } else {
                setError(dictionary.aiBanner.prompt.errors.generic);
            }
        } catch (err) {
            setLoading(false);
            if (err instanceof Error && err.name === 'AbortError') {
                setError('Request timed out');
            } else {
                // Log the error for debugging
                console.warn('LLM search error:', err);
                setError(dictionary.aiBanner.prompt.errors.generic);
            }
        }
    };

    const doSearch = (value: string) => {
        setQuery(value);
        submitQuery(null, value);
    };

    return (
        <div className={styles.llmSearch}>
            <form onSubmit={submitQuery}>
                <div className={styles.llmSearchBox}>
                    <Textfield
                        className={styles.llmInputTextfield}
                        label={<span className={styles.llmInputLabel}>{dictionary.aiBanner.prompt.label}</span>}
                        placeholder={dictionary.aiBanner.prompt.placeholder}
                        data-size='lg'
                        value={query}
                        error={error !== undefined}
                        onChange={(e) => setQuery(e.target.value)}
                        autoComplete='off'
                        aria-describedby='my-id'
                        data-color-scheme="dark"
                    />
                    <Button
                        className={styles.llmSearchButton}
                        type='submit'
                        data-size='sm'
                    >
                        {loading ? (
                            <Spinner
                                title={dictionary.aiBanner.prompt.loading}
                                data-size='xs'
                                variant='inverted'
                            />
                        ) : (
                            <>
                                <SparklesIcon
                                    className={styles.llmSearchIcon}
                                    aria-hidden
                                />
                                <span>{dictionary.aiBanner.prompt.button}</span>
                            </>
                        )}
                    </Button>
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
                        data-size='sm'
                    >
                        {error}
                    </ValidationMessage>
                </div>
            )}
            {results && !loading && (
                <MotionDiv
                    className={styles.llmResults as string}
                    variants={animations.resultsContainer}
                    initial='hidden'
                    animate='show'
                >
                    <MotionUl
                        className={styles.llmResultsList}
                        variants={animations.resultsList}
                        initial='hidden'
                        animate='show'
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
