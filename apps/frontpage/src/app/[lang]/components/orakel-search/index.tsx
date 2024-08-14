'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Textfield, Button, Spinner, ErrorMessage } from '@digdir/designsystemet-react';
import { SparklesIcon } from '@navikt/aksel-icons';
import { Dictionary } from '@fdk-frontend/dictionaries';

import { AdvancedSearchPrompt } from './components/advanced-search-prompt';

import { ResultItem, ItemObjectType } from './components/result-item';
import AuxPanel from './components/aux-panel';

// import mockResults from './data/results3.json';

import styles from './orakel-search.module.scss';

type OrakelSearchProps = {
    endpoint: string;
    dictionary: Dictionary;
    baseUri: string;
};

const OrakelSearch = ({ endpoint, dictionary, baseUri }: OrakelSearchProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<any>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    // const [ results, setResults ] = useState<any>(mockResults);

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

        setError(undefined);
        return true;
    };

    const submitQuery = async (e: any, overrideStateQuery?: string) => {
        if (e) e.preventDefault();

        const queryToSubmit = overrideStateQuery || query;

        if (!validate(queryToSubmit)) return;

        setLoading(true);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: queryToSubmit }),
            });

            setLoading(false);

            if (response.status === 200) {
                const json = await response.json();
                setResults(json);
            } else {
                setError(dictionary.aiBanner.prompt.errors.generic);
            }
        } catch (err) {
            setLoading(false);
            setError(dictionary.aiBanner.prompt.errors.generic);
        }
    };

    const doSearch = (value: string) => {
        setQuery(value);
        submitQuery(null, value);
    };

    return (
        <div className={styles.orakelSearch}>
            <form onSubmit={submitQuery}>
                <div className={styles.orakelSearchBox}>
                    <Textfield
                        className={styles.orakelInputTextfield}
                        label={<span className={styles.orakelInputLabel}>{dictionary.aiBanner.prompt.label}</span>}
                        placeholder={dictionary.aiBanner.prompt.placeholder}
                        size='large'
                        value={query}
                        error={error}
                        onChange={(e) => setQuery(e.target.value)}
                        autoComplete='off'
                    />
                    <Button
                        className={styles.orakelSearchButton}
                        type='submit'
                        size='sm'
                    >
                        {loading ? (
                            <Spinner
                                title={dictionary.aiBanner.prompt.loading}
                                size='xsmall'
                                variant='inverted'
                            />
                        ) : (
                            <>
                                <SparklesIcon
                                    className={styles.orakelSearchIcon}
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
                    baseUri={baseUri}
                />
            )}
            {error && !loading && (
                <div className={styles.status}>
                    <ErrorMessage
                        aria-hidden
                        className={styles.errorMessage}
                        size='sm'
                    >
                        {error}
                    </ErrorMessage>
                </div>
            )}
            {results && !loading && (
                <motion.div
                    className={styles.orakelResults}
                    variants={animations.resultsContainer}
                    initial='hidden'
                    animate='show'
                >
                    <motion.ul
                        className={styles.orakelResultsList}
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
                                    <ResultItem item={item} />
                                </motion.li>
                            ))}
                        <motion.li variants={animations.resultsItem}>
                            <AdvancedSearchPrompt
                                dictionary={dictionary}
                                baseUri={baseUri}
                            />
                        </motion.li>
                    </motion.ul>
                </motion.div>
            )}
        </div>
    );
};

export default OrakelSearch;
