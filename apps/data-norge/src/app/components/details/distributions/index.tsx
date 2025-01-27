'use client';

import cn from 'classnames';
import { Accordion, Heading } from '@digdir/designsystemet-react';
import { type LocaleCodes } from '@fdk-frontend/dictionaries';
import { type JSONValue } from '@fdk-frontend/types';
import { sumArrayLengths } from '@fdk-frontend/utils';
import Badge from '@fdk-frontend/ui/badge';
import HStack from '@fdk-frontend/ui/hstack';
import PlaceholderBox from '../placeholder-box';
import styles from './distributions.module.scss';
import DistributionDetails from './components/distribution-details';
import DistributionHeader from './components/distribution-header';
import ApiHeader from './components/api-header';
import ApiDetails from './components/api-details';

export type DistributionsProps = {
    datasets?: JSONValue[];
    exampleData?: JSONValue[];
    apis?: JSONValue[];
    className?: string;
    locale: LocaleCodes;
};

const Distributions = ({ exampleData = [], datasets = [], apis = [], className, locale, ...props }: DistributionsProps) => {
    return (
        <div className={cn(styles.distributions, className)}>
            <Heading
                level={4}
                size='xxsmall'
            >
                <HStack>
                    <div>Distribusjoner</div>
                    <Badge>{sumArrayLengths(datasets, exampleData)}</Badge>
                </HStack>
            </Heading>
            {
                datasets && datasets.length ?
                <Accordion border>
                    {datasets.map((distribution, index) => (
                        <Accordion.Item key={distribution.accessURL}>
                            <Accordion.Header
                                level={3}
                                className={styles.header}
                            >
                                <DistributionHeader distribution={distribution} locale={locale} />
                            </Accordion.Header>
                            <Accordion.Content className={styles.content}>
                                <DistributionDetails distribution={distribution} locale={locale} />
                            </Accordion.Content>
                        </Accordion.Item>
                    ))}
                    {exampleData && exampleData.map((example, index) => (
                        <Accordion.Item key={example.accessURL}>
                            <Accordion.Header
                                level={3}
                                className={styles.header}
                            >
                                <DistributionHeader distribution={example} locale={locale} exampleData={true} />
                            </Accordion.Header>
                            <Accordion.Content className={styles.content}>
                                <DistributionDetails distribution={example} locale={locale} />
                            </Accordion.Content>
                        </Accordion.Item>
                    ))}
                </Accordion> :
                <PlaceholderBox>
                    Dette datasettet har ingen distribusjoner.
                </PlaceholderBox>
            }
            <Heading
                level={4}
                size='xxsmall'
            >
                <HStack>
                    <div>API-er som tilgjengeliggjør dette datasettet</div>
                    <Badge>{apis.length}</Badge>
                </HStack>
            </Heading>
            {
                apis && apis.length ?
                <Accordion border>
                    {apis.map((api, index) => (
                        <Accordion.Item key={api.id}>
                            <Accordion.Header
                                level={3}
                                className={styles.header}
                            >
                                <ApiHeader api={api} locale={locale} />
                            </Accordion.Header>
                            <Accordion.Content className={styles.content}>
                                <ApiDetails api={api} locale={locale} />
                            </Accordion.Content>
                        </Accordion.Item>
                    ))}
                </Accordion> :
                <PlaceholderBox>
                    Ingen registrerte API-er tilgjengeliggjør dette datasettet.
                </PlaceholderBox>
            }
        </div>
    );
};

export default Distributions;
