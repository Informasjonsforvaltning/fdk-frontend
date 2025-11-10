'use client';

import { Card, Details, Heading } from '@digdir/designsystemet-react';
import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import { sumArrayLengths, printLocaleValue } from '@fdk-frontend/utils';
import { type PublicServiceOutput } from '@fellesdatakatalog/types';
import { Badge, Hstack, PlaceholderBox } from '@fdk-frontend/ui';
import styles from './produces.module.scss';

export type ProducesProps = {
    produces?: PublicServiceOutput[];
    locale: LocaleCodes;
    dictionaries: {
        common: Dictionary;
        detailsPage: Dictionary;
    };
};

const Produces = ({ produces = [], locale, dictionaries }: ProducesProps) => {
    return (
        <div className={styles.produces}>
            <Heading
                level={2}
                data-size='xs'
            >
                <Hstack>
                    <div>{dictionaries.detailsPage.produces.title}</div>
                    <Badge>{sumArrayLengths(produces)}</Badge>
                </Hstack>
            </Heading>
            {sumArrayLengths(produces) > 0 ? (
                <Card>
                    {produces.map((output, index) => (
                        <div
                            key={`${output.identifier}-${index}`}
                            className={styles.accordionWrapper}
                        >
                            <Details className={styles.accordionItem}>
                                <Details.Summary>
                                    <div className={styles.headerContent}>
                                        <span className={styles.title}>
                                            {printLocaleValue(locale, output.name) ||
                                                dictionaries.detailsPage.produces.header.nameless}
                                        </span>
                                    </div>
                                </Details.Summary>
                                <Details.Content className={styles.content}>
                                    <p>
                                        {printLocaleValue(locale, output.description) ||
                                            dictionaries.detailsPage.produces.header.nameless}
                                    </p>
                                </Details.Content>
                            </Details>
                        </div>
                    ))}
                </Card>
            ) : (
                <PlaceholderBox>{dictionaries.detailsPage.produces.placeholder}</PlaceholderBox>
            )}
        </div>
    );
};

export default Produces;
