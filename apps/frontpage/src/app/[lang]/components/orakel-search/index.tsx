'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion';
import { Textfield, Button, Link, Heading, Spinner, ErrorMessage, HelpText, Paragraph } from '@digdir/designsystemet-react';
import { SparklesIcon, FilesIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { Dictionary, interpolate } from '@fdk-frontend/dictionaries';

import { AdvancedSearchPrompt } from './components/advanced-search-prompt';

const DynamicQuerySuggestion = dynamic(() => import('./components/query-suggestion'), {
    ssr: false
});

import { ResultItem, ItemObjectType } from './components/result-item';

import mockResults from './data/results3.json';

import styles from './orakel-search.module.scss';

type OrakelSearchProps = {
	endpoint: string;
	dictionary: Dictionary;
	baseUri: string;
}

const OrakelSearch = ({ endpoint, dictionary, baseUri }: OrakelSearchProps) => {

	const [ loading, setLoading ]  = useState<boolean>(false);
	const [ query, setQuery ] = useState<string>('');
	const [ results, setResults ] = useState<any>(undefined);
	const [ error, setError ] = useState<string | undefined>(undefined);
	// const [ results, setResults ] = useState<any>(mockResults);

	const animations = {
		resultsContainer: {
			hidden: { height: 0 },
			show: { height: 'auto', transition: { duration: 0.15 } }
		},
		resultsList: {
			hidden: { opacity: 0 },
			show: {
				opacity: 1,
				transition: {
					staggerChildren: 0.1
				}
			}
		},
		resultsItem: {
			hidden: { opacity: 0, scale: 0.9 },
			show: { opacity: 1, scale: 1 }
		}
	};

	const validate = (q: string) => {
		if (!q || q.length < 3) {
			setError(dictionary.aiBanner.prompt.errors.queryTooShort);
			return false;
		}

		setError(undefined);
		return true;
	}

	const submitQuery = async (e: any, q?: string) => {
		if (e) e.preventDefault();

		if (q) {
			if (!validate(q)) return false;
		} else {
			if (!validate(query)) return false;
		}

		setLoading(true);

		try {
			await fetch(endpoint, {
		        method: 'POST',
		        headers: {
		            'Accept': 'application/json',
		            'Content-Type': 'application/json'
		        },
		        body: JSON.stringify({ query: q ?? query })
		    })
		    .then(res => {
		    		setLoading(false);

		        if (res.status === 200) {
		          return res.json();
		        }

		        setError(dictionary.aiBanner.prompt.errors.generic);
		        return undefined;
		    })
		    .then(json => {
		        setResults(json);
		    });
		} catch (err) {
			setLoading(false);
			setError(dictionary.aiBanner.prompt.errors.generic);
			console.log(err);
		}

	}

	const doSearch = (value: string) => {
		setQuery(value);
		submitQuery(null, value);
	}

	return (
		<div className={styles.orakelSearch}>
			<form onSubmit={submitQuery}>
				<div className={styles.orakelSearchBox}>
					<Textfield
		        className={styles.orakelInputTextfield}
		        label={
		        	<span className={styles.orakelInputLabel}>
		        		{dictionary.aiBanner.prompt.label}
		        	</span>
		        }
		        placeholder={dictionary.aiBanner.prompt.placeholder}
		        size="large"
		        value={query}
		        error={error}
		        onChange={(e) => setQuery(e.target.value)}
		        autoComplete="off"
		      />
		      <Button
		      	className={styles.orakelSearchButton}
		      	type="submit"
		      	size="sm"
		      >
		      	{
		      		loading ?
		      		<Spinner title={dictionary.aiBanner.prompt.loading} size="xsmall" variant="inverted" /> :
		      		<>
		      			<SparklesIcon className={styles.orakelSearchIcon} aria-hidden />
		      			<span>{dictionary.aiBanner.prompt.button}</span>
		      		</>
		      	}
		      </Button>
				</div>
		  </form>
		  {
		  	(!error && !loading) &&
		  	<div className={styles.auxPanel}>
		  		<div>
			  		{
			  			!results &&
			  			<DynamicQuerySuggestion
			  				dictionary={dictionary}
			  				onClick={(query: string) => doSearch(query)}
			  			/>
			  		}
			  		{
			  			results &&
			  			<>
			  				{
			  					results.hits.length > 0
					  			? interpolate(dictionary.aiBanner.prompt.responses.resultsFound, { num: results.hits.length })
					  			: dictionary.aiBanner.prompt.responses.noResults
			  				}
			  			</>
			  		}
		  		</div>
		  		<HelpText size="sm" title={dictionary.aiBanner.tooltip.label} className={styles.helptext}>
		  			<Paragraph size="sm">{dictionary.aiBanner.tooltip.text}</Paragraph>
		  			<Paragraph size="xs"><b>{dictionary.aiBanner.tooltip.disclaimer}</b></Paragraph>
		  			<Paragraph size="sm"><Link href={`${baseUri}/getting-started/finding-data`}>{dictionary.aiBanner.tooltip.readMoreLinkText}</Link></Paragraph>
		  		</HelpText>
		  	</div>
		  }
		  {
		  	error && !loading &&
		  	<div className={styles.status}>
		  		<ErrorMessage aria-hidden className={styles.errorMessage} size="sm">{error}</ErrorMessage>
	  		</div>
		  }
		  {
		  	(results && !loading) &&
		  	<motion.div
		  		className={styles.orakelResults}
		  		variants={animations.resultsContainer}
		  		initial="hidden"
					animate="show"
		  	>
			  	<motion.ul
			  		className={styles.orakelResultsList}
			  		variants={animations.resultsList}
						initial="hidden"
						animate="show"
			  	>
			  		{
			  			results.hits && results.hits.map((item: ItemObjectType, i: number) => {
					  		return (
					  			<motion.li
					  				key={`item-${i}`}
					  				variants={animations.resultsItem}
					  			>
					  				<ResultItem item={item} />
					  			</motion.li>
					  		);
					  	})
			  		}
			  		<motion.li variants={animations.resultsItem}>
			  			<AdvancedSearchPrompt
			  				dictionary={dictionary}
			  				baseUri={baseUri}
			  			/>
			  		</motion.li>
			  	</motion.ul>
			  </motion.div>

		  }
		</div>
	);
}

export { OrakelSearch };
