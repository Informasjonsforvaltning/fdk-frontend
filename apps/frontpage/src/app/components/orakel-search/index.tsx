'use client';

import React, { useState, useEffect } from 'react';

import { Textfield, Button, Link, Heading } from '@digdir/designsystemet-react';
import { Spinner } from '@digdir/designsystemet-react';

import { Markdown } from '../markdown';

import mockResults from './data/results.json';

import styles from './orakel-search.module.css';

const parseJsonResults = (json: any) => {
	const { llm, links, titles } = json;
	const regex = /\*\*(.*?)\*\*([\s\S]*?)(?=\n\n\*\*|\n*$)/g;
	
	const items = [];

	let match;
	while ((match = regex.exec(llm)) !== null) {
	  const llmTitle = match[1];
	  const linkIndex = titles.findIndex(title => title.toLowerCase() === llmTitle.toLowerCase());
	  const description = match[2].trim();
	  items.push({ title: llmTitle, description, link: links[linkIndex] });
	}
	return { llm, items };
}

const OrakelSearch = () => {

	const [ loading, setLoading ]  = useState<boolean>(false);
	const [ query, setQuery ] = useState<string>('');
	const [ results, setResults ] = useState<any>(undefined);
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
	        setResults(parseJsonResults(json));
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
		      />
		      <Button
		      	className={styles.orakelSearchButton}
		      	type="submit"
		      	size="sm"
		      >
		      	{
		      		loading ?
		      		<Spinner size="small" variant="inverted" /> :
		      		<>Finn data</>
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
		  	<div className={styles.orakelResults}>
			  	<ul className={styles.orakelResultsList}>
			  		{
			  			results.items && results.items.map((item, i) => {
					  		return (
					  			<li key={`item-${i}`}>
					  				<Heading level={4} size="xxsmall">
					  				{
					  					item.link ?
					  					<Link inverted href={item.link}>{item.title}</Link> :
					  					item.title
					  				}
					  				</Heading>
					  				<Markdown>
					  					{item.description}
					  				</Markdown>
					  			</li>
					  		);
					  	})
			  		}
			  	</ul>
			  </div>
		  }
		</div>
	);
}

export { OrakelSearch };