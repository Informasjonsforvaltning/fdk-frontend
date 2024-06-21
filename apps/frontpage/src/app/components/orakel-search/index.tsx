"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Textfield, Button, Link, Heading, Spinner } from '@digdir/designsystemet-react';
import { SparklesIcon, FilesIcon, MagnifyingGlassIcon } from '@navikt/aksel-icons';

import { Markdown } from '../markdown';
import { CatalogSymbol } from '../catalog-symbol';
import { AdvancedSearchPrompt } from './components/advanced-search-prompt';

import mockResults from './data/results.json';

import styles from './orakel-search.module.scss';

const parseJsonResults = (json: any, query: string) => {
	const { llm, links, titles } = json;

	const noHitsRegex = /Ingen av datasettene/i;
	if (noHitsRegex.test(json.llm)) {
		let response;
		if (query && query.length > 1) {
			response = `Ingen av datasettene inneholder informasjon om "${query}"`;
		} else {
			response = `Fant ikke noe relevant informasjon. Prøv en annen spørring.`;
		}
		return { llm: response, items: [] }
	}

	const titleRegex = /\*\*(.*?)\*\*([\s\S]*?)(?=\n\n\*\*|\n*$)/g;
	const items = [];

	let match;
	while ((match = titleRegex.exec(llm)) !== null) {
	  const llmTitle = match[1];
	  const linkIndex = titles.findIndex(title => title.toLowerCase() === llmTitle.toLowerCase());
	  const description = match[2].trim();
	  items.push({ title: llmTitle, description, link: links[linkIndex] });
	}
	return { llm, items };
}

const framerResultsContainer = {
	hidden: { height: 0 },
	show: { height: 'auto', transition: { duration: 0.15 } }
}

const framerResultsList = {
	hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const framerResultsItem = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 }
}

const OrakelSearch = () => {

	const [ loading, setLoading ]  = useState<boolean>(false);
	const [ query, setQuery ] = useState<string>('');
	const [ results, setResults ] = useState<any>(undefined);
	// const [ error, setError ] = useState<string | undefined>('Spørringen må inneholde mer enn ett tegn. Prøv igjen.');
	// const [ results, setResults ] = useState<any>(parseJsonResults(mockResults));

	const submitQuery = async (e: any, q?: string) => {
		if (e) e.preventDefault();

		setLoading(true);

		try {
			await fetch(`https://fdk-llm.dev.entur.io/llm/v3`, {
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
	        setResults(parseJsonResults(json, query));
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
				      			<span>Finn data</span>
				      		</>
				      	}
				      </Button>
				  </div>
		  </form>
		  {
		  	(!results && !loading) &&
		  	<div className={styles.suggestion}>
		  		Prøv f.eks. <Link onClick={(e) => { doSearch('Antall Teslaer solgt i Norge i 2022'); return false; }} inverted href="#">Antall Teslaer solgt i Norge i 2022</Link>
		  	</div>
		  }
		  {
		  	results && !loading &&
		  	<div className={styles.llmResponse}>
		  		{
		  			results.items.length > 0 ?
		  			`Jeg fant ${results.items.length} datasett som kan være relevante:` :
		  			`${results.llm}`
		  		}
	  		</div>
		  }
		  {
		  	(results && !loading) &&
		  	<motion.div
		  		className={styles.orakelResults}
		  		variants={framerResultsContainer}
		  		initial="hidden"
				animate="show"
		  	>
			  	<motion.ul
			  		className={styles.orakelResultsList}
			  		variants={framerResultsList}
					initial="hidden"
					animate="show"
			  	>
			  		{
			  			results.items && results.items.map((item, i) => {
					  		return (
					  			<motion.li
					  				key={`item-${i}`}
					  				variants={framerResultsItem}
					  			>
					  				<a href={item.link} className={styles.catalogLink}>
						  				{/*<div><FilesIcon aria-hidden fontSize="1.5em" /></div>*/}
						  				<CatalogSymbol className={styles.catalogIcon} catalog="datasets" />
						  				<div>
							  				<Heading className={styles.catalogTitle} level={4} size="xxsmall">
							  					{item.title}
							  				</Heading>
							  				<Markdown>
							  					{item.description}
							  				</Markdown>
							  			</div>
							  		</a>
					  			</motion.li>
					  		);
					  	})
			  		}
			  		<motion.li variants={framerResultsItem}>
			  			<AdvancedSearchPrompt />
			  		</motion.li>
			  	</motion.ul>
			  </motion.div>

		  }
		</div>
	);
}

export { OrakelSearch };