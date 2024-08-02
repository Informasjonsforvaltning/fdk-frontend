'use client';

import { useState } from 'react';

import { Link } from '@digdir/designsystemet-react';

import styles from './query-suggestion.module.scss';

type QuerySuggestionProps = {
	onClick: (query: string) => void;
}

const QuerySuggestion = ({ onClick, ...rest }: QuerySuggestionProps & React.HTMLAttributes<HTMLDivElement>) => {

	const suggestions = [
		'Antall Teslaer solgt i Norge i 2022',
		'Hvilke områder i Norge er vernet?',
		'Hvilke varer eksporterer Norge mest?',
		'Hvordan ser trafikkmønstrene ut i Oslo?',
		'Hvordan presterer norske skoler?',
		'Hvilke forskningsprosjekter får støtte i Norge?',
		'Hvor mye skog har Norge?',
		'Hvordan går det med digitalisering i Norge?',
		'Hvilke teknologier er mest brukt i Norge?'
	];

	const randomIndex = Math.floor(Math.random() * suggestions.length);

	const [ suggestion, setSuggestion ] = useState(suggestions[randomIndex]);

	return (
		<div className={styles.querySuggestion}>
			<span>Prøv f.eks.</span>&nbsp;
			<Link onClick={(e) => { onClick(suggestion); return false; }} inverted href="#">
				{suggestion}
			</Link>
		</div>
	);
}

export default QuerySuggestion;