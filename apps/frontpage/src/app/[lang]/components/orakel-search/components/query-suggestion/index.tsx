'use client';

import { useState } from 'react';

import { Link } from '@digdir/designsystemet-react';
import { Dictionary } from '@fdk-frontend/dictionaries';

import styles from './query-suggestion.module.scss';

type QuerySuggestionProps = {
	dictionary: Dictionary;
	onClick: (query: string) => void;
}

const QuerySuggestion = ({ dictionary, onClick, ...rest }: QuerySuggestionProps & React.HTMLAttributes<HTMLDivElement>) => {

	const suggestions = dictionary.aiBanner.suggestions.list;
	const randomIndex = Math.floor(Math.random() * suggestions.length);
	const [ suggestion, setSuggestion ] = useState(suggestions[randomIndex]);

	return (
		<div className={styles.querySuggestion}>
			<span>{dictionary.aiBanner.suggestions.prefix}</span>&nbsp;
			<Link onClick={(e) => { onClick(suggestion); return false; }} inverted href="#">
				{suggestion}
			</Link>
		</div>
	);
}

export default QuerySuggestion;