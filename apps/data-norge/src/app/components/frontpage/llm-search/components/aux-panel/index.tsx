import dynamic from 'next/dynamic';
import { Link, Paragraph, Button, Popover } from '@digdir/designsystemet-react';
import { type Dictionary, type LocaleCodes, interpolate } from '@fdk-frontend/dictionaries';

// import QuerySuggestion from '../query-suggestion';
const QuerySuggestion = dynamic(() => import('../query-suggestion'), {
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
                    <QuerySuggestion
                        dictionary={dictionary}
                        onClick={onRequestSearch}
                    />
                ) : (
                    getResultsText()
                )}
            </div>
            {
                !numResults &&
                <div className={styles.helptextWrapper}>
                    <Popover.TriggerContext>
                        <Popover.Trigger
                            variant='tertiary'
                            data-size='sm'
                            data-color-scheme='dark'
                        >
                            {dictionary.aiBanner.tooltip.label}
                        </Popover.Trigger>
                        <Popover placement='right'>
                            <Paragraph>{dictionary.aiBanner.tooltip.text}</Paragraph>
                            <Paragraph>
                                <b>{dictionary.aiBanner.tooltip.disclaimer}</b>
                            </Paragraph>
                            <Paragraph>
                                <Button
                                    data-size='sm'
                                    asChild
                                >
                                    <Link href={`/${locale}/docs/finding-data/ai-search`}>
                                        {dictionary.aiBanner.tooltip.readMoreLinkText}
                                    </Link>
                                </Button>
                            </Paragraph>
                        </Popover>
                    </Popover.TriggerContext>
                </div>
            }
        </div>
    );
};

export default AuxPanel;
