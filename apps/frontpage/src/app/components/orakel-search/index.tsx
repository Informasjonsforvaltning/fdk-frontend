"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Textfield, Button, Link, Heading, Spinner } from '@digdir/designsystemet-react';
import { SparklesIcon, FilesIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';

import { AdvancedSearchPrompt } from './components/advanced-search-prompt';
import { QuerySuggestion } from './components/query-suggestion';
import { ResultItem } from './components/result-item';

import mockResults from './data/results3.json';

import styles from './orakel-search.module.scss';

const OrakelSearch = () => {

	const [ loading, setLoading ]  = useState<boolean>(false);
	const [ query, setQuery ] = useState<string>('');
	const [ results, setResults ] = useState<any>(undefined);
	// const [ error, setError ] = useState<string | undefined>('Spørringen må inneholde mer enn ett tegn. Prøv igjen.');
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

	const submitQuery = async (e: any, q?: string) => {
		if (e) e.preventDefault();

		setLoading(true);

		try {
			await fetch(`https://aisearch.api.staging.fellesdatakatalog.digdir.no/llm`, {
			// await fetch(`https://fdk-llm.dev.entur.io/llm/v3`, {
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

		        return undefined;
		    })
		    .then(json => {
		        // setResults(parseJsonResults(json, query));
		        setResults(json);
		    });
		} catch (err) {
			setLoading(false);
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
				        label={<span className={styles.orakelInputLabel}>Spør vår AI om data fra over 250 virksomheter og 7000 datasett:</span>}
				        placeholder="Hva leter du etter?"
				        size="large"
				        value={query}
				        onChange={(e) => setQuery(e.target.value)}
				        autocomplete="off"
				      />
				      <Button
				      	className={styles.orakelSearchButton}
				      	type="submit"
				      	size="sm"
				      >
				      	{
				      		loading ?
				      		<Spinner size="xsmall" variant="inverted" /> :
				      		<>
				      			<SparklesIcon className={styles.orakelSearchIcon} aria-hidden />
				      			<span>Spør</span>
				      		</>
				      	}
				      </Button>
				  </div>
		  </form>
		  {
		  	(!results && !loading) &&
		  	<div className={styles.suggestion}>
		  		<QuerySuggestion onClick={(query: string) => doSearch(query)} />
		  		{/*
		  		Prøv f.eks. <Link onClick={(e) => { doSearch('Antall Teslaer solgt i Norge i 2022'); return false; }} inverted href="#">Antall Teslaer solgt i Norge i 2022</Link>
		  		*/}
		  	</div>
		  }
		  {
		  	results && !loading &&
		  	<div className={styles.llmResponse}>
		  		{
		  			results.hits.length > 0 ?
		  			`Jeg fant ${results.hits.length} datasett som kan være relevante:` :
		  			`${results.llm}`
		  		}
	  		</div>
		  }
		  {
		  	(results && !loading) &&
		  	<motion.div
		  		className={styles.orakelResults}
		  		variants={animations.resultsContainer}
		  		// onAnimationComplete={() => window.setTimeout(() => window.dispatchEvent(new Event('resize')), 500)}
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
			  			results.hits && results.hits.map((item, i) => {
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
			  			<AdvancedSearchPrompt />
			  		</motion.li>
			  	</motion.ul>
			  </motion.div>

		  }
		</div>
	);
}

export { OrakelSearch };