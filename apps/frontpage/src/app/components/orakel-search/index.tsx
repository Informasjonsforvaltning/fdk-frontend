'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion';
import { Textfield, Button, Link, Heading, Spinner, ErrorMessage, HelpText, Paragraph } from '@digdir/designsystemet-react';
import { SparklesIcon, FilesIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';

import { AdvancedSearchPrompt } from './components/advanced-search-prompt';

const DynamicQuerySuggestion = dynamic(() => import('./components/query-suggestion'), {
    ssr: false
});

import { ResultItem } from './components/result-item';

import mockResults from './data/results3.json';

import styles from './orakel-search.module.scss';

const OrakelSearch = () => {

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

	const validate = (q) => {
		if (!q || q.length < 3) {
			setError('Spørringen må inneholde mer enn to tegn. Prøv igjen.');
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

		        setError('En feil oppstod. Vennligst prøv igjen.');
		        return undefined;
		    })
		    .then(json => {
		        // setResults(parseJsonResults(json, query));
		        setResults(json);
		    });
		} catch (err) {
			setLoading(false);
			setError('En feil oppstod. Vennligst prøv igjen.');
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
		        label={<span className={styles.orakelInputLabel}>Spør vår KI om data fra over 125 virksomheter og 8000 datasett:</span>}
		        placeholder="Hva leter du etter?"
		        size="large"
		        value={query}
		        error={error}
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
		  	(!error && !loading) &&
		  	<div className={styles.auxPanel}>
		  		<div>
			  		{ !results && <DynamicQuerySuggestion onClick={(query: string) => doSearch(query)} /> }
			  		{
			  			results && results.hits.length > 0 &&
			  			`Jeg fant ${results.hits.length} datasett som kan være relevante:`
			  		}
			  		{
			  			results && !results.hits.length > 0 &&
			  			`Jeg fant dessverre ingen relevante datasett. Prøv gjerne en annen spørring.`
			  		}
		  		</div>
		  		<HelpText size="sm" title="Om KI-søket" className={styles.helptext}>
		  			<Paragraph size="sm">Vårt KI-søk gjør det enkelt å finne datasett ved å bruke naturlig språk uten at du trenger å kjenne til spesifikke datasettnavn, fagtermer eller tekniske formater.</Paragraph>
		  			<Paragraph size="xs"><b>Vær obs på at KI-søket kan inneholde feil.</b></Paragraph>
		  			<Paragraph size="sm"><Link href="#">Les mer om KI-søket her</Link></Paragraph>
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