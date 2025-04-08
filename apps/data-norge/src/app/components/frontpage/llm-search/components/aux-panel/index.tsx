import dynamic from 'next/dynamic';

import { Link, Paragraph, HelpText, Button } from '@digdir/designsystemet-react';

import { type Dictionary, type LocaleCodes, interpolate } from '@fdk-frontend/dictionaries';

const DynamicQuerySuggestion = dynamic(() => import('../query-suggestion'), {
    ssr: false,
});

import styles from './aux-panel.module.scss';

export type AuxPanelProps = {
    dictionary: Dictionary;
    onRequestSearch: (query: string) => void;
    locale: LocaleCodes;
    numResults?: number;
};

const AuxPanel = ({ dictionary, onRequestSearch, locale, numResults }: AuxPanelProps) => {
    const getResultsText = () =>
        numResults !== undefined && numResults > 0
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
                    <Button
                        size='sm'
                        asChild
                    >
                        <Link href={`/${locale}/docs/finding-data/ai-search`}>
                            {dictionary.aiBanner.tooltip.readMoreLinkText}
                        </Link>
                    </Button>
                </Paragraph>
            </HelpText>
        </div>
    );
};

export default AuxPanel;
