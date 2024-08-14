import dynamic from 'next/dynamic';

import { Link, Paragraph, HelpText } from '@digdir/designsystemet-react';

import { Dictionary, interpolate } from '@fdk-frontend/dictionaries';

const DynamicQuerySuggestion = dynamic(() => import('../query-suggestion'), {
    ssr: false,
});

import styles from './aux-panel.module.scss';

export type AuxPanelProps = {
    dictionary: Dictionary;
    onRequestSearch: (query: string) => void;
    baseUri: string;
    numResults?: number;
};

const AuxPanel = ({ dictionary, numResults, onRequestSearch, baseUri }) => {
    const getResultsText = () =>
        numResults > 0
            ? interpolate(dictionary.aiBanner.prompt.responses.resultsFound, { num: numResults })
            : dictionary.aiBanner.prompt.responses.noResults;

    return (
        <div className={styles.auxPanel}>
            <div>
                {numResults === undefined ? (
                    <DynamicQuerySuggestion
                        dictionary={dictionary}
                        onClick={onRequestSearch}
                    />
                ) : (
                    getResultsText()
                )}
            </div>
            <HelpText
                size='sm'
                title={dictionary.aiBanner.tooltip.label}
                className={styles.helptext}
            >
                <Paragraph size='sm'>{dictionary.aiBanner.tooltip.text}</Paragraph>
                <Paragraph size='xs'>
                    <b>{dictionary.aiBanner.tooltip.disclaimer}</b>
                </Paragraph>
                <Paragraph size='sm'>
                    <Link href={`${baseUri}/getting-started/finding-data`}>
                        {dictionary.aiBanner.tooltip.readMoreLinkText}
                    </Link>
                </Paragraph>
            </HelpText>
        </div>
    );
};

export default AuxPanel;
