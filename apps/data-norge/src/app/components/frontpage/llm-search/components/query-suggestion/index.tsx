'use client';

import React, { useState } from 'react';

import { Link } from '@digdir/designsystemet-react';
import { type Localization } from '@fdk-frontend/localization';

import styles from './query-suggestion.module.scss';

type QuerySuggestionProps = {
    dictionary: Localization;
    onClick: (query: string) => void;
};

const QuerySuggestion = ({ dictionary, onClick, ...rest }: QuerySuggestionProps) => {
    const suggestions = dictionary.aiBanner.suggestions.list;
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
