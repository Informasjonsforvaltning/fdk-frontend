'use client';

import React, { useState } from 'react';

import { Link } from '@digdir/designsystemet-react';
import { Dictionary } from '@fdk-frontend/dictionaries';

import styles from './query-suggestion.module.scss';

type QuerySuggestionProps = {
    dictionary: Dictionary;
    onClick: (query: string) => void;
};

const QuerySuggestion = ({ dictionary, onClick, ...rest }: QuerySuggestionProps) => {
    const suggestions = dictionary.aiBanner.suggestions.list;
    // eslint-disable-next-line react-hooks/purity
    const randomIndex = Math.floor(Math.random() * suggestions.length);
    const [suggestion] = useState(suggestions[randomIndex]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onClick(suggestion);
    };

    return (
        <div
            className={styles.querySuggestion}
            data-color-scheme='dark'
        >
            <span>{dictionary.aiBanner.suggestions.prefix}</span>&nbsp;
            <Link
                onClick={handleClick}
                href='#'
                className={styles.customLink}
            >
                {suggestion}
            </Link>
        </div>
    );
};

export default QuerySuggestion;
