'use client';

import { useState } from 'react';

import { Link } from '@digdir/designsystemet-react';
import { Dictionary } from '@fdk-frontend/i18n';

import styles from './query-suggestion.module.scss';

type QuerySuggestionProps = {
	dictionary: Dictionary;
	onClick: (query: string) => void;
}

const QuerySuggestion = ({ dictionary, onClick }: QuerySuggestionProps) => {

	const suggestions = dictionary.aiBanner.suggestions.list;
	const randomIndex = Math.floor(Math.random() * suggestions.length);
	const [ suggestion, setSuggestion ] = useState(suggestions[randomIndex]);

	return (
		<div className={styles.querySuggestion}>
			<span>{dictionary.aiBanner.suggestions.prefix}</span>&nbsp;
			<Link onClick={(e: any) => { onClick(suggestion); return false; }} inverted href="#">
				{suggestion}
			</Link>
		</div>
	);
}

export default QuerySuggestion;