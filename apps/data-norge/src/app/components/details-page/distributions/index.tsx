'use client';
import cn from 'classnames';
import { Accordion, Heading } from '@digdir/designsystemet-react';
import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import { type JSONValue } from '@fdk-frontend/types';
import { sumArrayLengths } from '@fdk-frontend/utils';
import { ArrowRightIcon, DownloadIcon } from '@navikt/aksel-icons';
import Badge from '@fdk-frontend/ui/badge';
import HStack from '@fdk-frontend/ui/hstack';
import PlaceholderBox from '@fdk-frontend/ui/placeholder-box';
import styles from './distributions.module.scss';
import DistributionDetails from './components/distribution-details';
import DistributionHeader from './components/distribution-header';
import ApiHeader from './components/api-header';
import ApiDetails from './components/api-details';
import ActionButton from './components/action-button';

export type DistributionsProps = {
    datasets?: JSONValue[];
    exampleData?: JSONValue[];
    apis?: JSONValue[];
    className?: string;
    locale: LocaleCodes;
    dictionary: Dictionary;
};

const Distributions = ({
    exampleData = [],
    datasets = [],
    apis = [],
    className,
    locale,
    dictionary,
    ...props
}: DistributionsProps) => {
    return (
        <div className={cn(styles.distributions, className)}>
            <Heading
                level={2}
                size='xxsmall'
            >
                <HStack>
                    <div>{dictionary.distributions.title}</div>
                    <Badge>{sumArrayLengths(datasets, exampleData)}</Badge>
                </HStack>
            </Heading>
            {datasets && datasets.length ? (
                <Accordion border>
                    {datasets.map((distribution, index) => (
                        <Accordion.Item
                            className={styles.accordionItem}
                            key={`${distribution.accessURL}-${index}`}
                        >
                            <Accordion.Header
                                level={3}
                                className={styles.header}
                            >
                                <DistributionHeader
                                    distribution={distribution}
                                    locale={locale}
                                    dictionary={dictionary}
                                />
                            </Accordion.Header>
                            <ActionButton uri={distribution.accessURL}>
                                <DownloadIcon
                                    aria-hidden
                                    fontSize='1.2em'
                                />
                                {dictionary.distributions.header.downloadBtnLabel}
                            </ActionButton>
                            <Accordion.Content className={styles.content}>
                                <DistributionDetails
                                    distribution={distribution}
                                    locale={locale}
                                    dictionary={dictionary}
                                />
                            </Accordion.Content>
                        </Accordion.Item>
                    ))}
                    {exampleData &&
                        exampleData.map((example, index) => (
                            <Accordion.Item
                                className={styles.accordionItem}
                                key={example.accessURL}
                            >
                                <Accordion.Header
                                    level={3}
                                    className={styles.header}
                                >
                                    <DistributionHeader
                                        distribution={example}
                                        locale={locale}
                                        dictionary={dictionary}
                                        exampleData={true}
                                    />
                                </Accordion.Header>
                                <ActionButton uri={example.accessURL}>
                                    <DownloadIcon
                                        aria-hidden
                                        fontSize='1.2em'
                                    />
                                    {dictionary.distributions.header.downloadBtnLabel}
                                </ActionButton>
                                <Accordion.Content className={styles.content}>
                                    <DistributionDetails
                                        distribution={example}
                                        locale={locale}
                                        dictionary={dictionary}
                                    />
                                </Accordion.Content>
                            </Accordion.Item>
                        ))}
                </Accordion>
            ) : (
                <PlaceholderBox>{dictionary.distributions.placeholder}</PlaceholderBox>
            )}
            <Heading
                level={2}
                size='xxsmall'
            >
                <HStack>
                    <div>{dictionary.apis.title}</div>
                    <Badge>{apis.length}</Badge>
                </HStack>
            </Heading>
            {apis && apis.length ? (
                <Accordion border>
                    {apis.map((api, index) => (
                        <Accordion.Item
                            className={styles.accordionItem}
                            key={api.id}
                        >
                            <Accordion.Header
                                level={3}
                                className={styles.header}
                            >
                                <ApiHeader
                                    api={api}
                                    locale={locale}
                                    dictionary={dictionary}
                                />
                            </Accordion.Header>
                            <ActionButton uri={`/data-services/${api.id}`}>
                                {dictionary.apis.header.gotoBtn}
                                <ArrowRightIcon
                                    aria-hidden
                                    fontSize='1.2em'
                                />
                            </ActionButton>
                            <Accordion.Content className={styles.content}>
                                <ApiDetails
                                    api={api}
                                    locale={locale}
                                    dictionary={dictionary}
                                />
                            </Accordion.Content>
                        </Accordion.Item>
                    ))}
                </Accordion>
            ) : (
                <PlaceholderBox>{dictionary.apis.placeholder}</PlaceholderBox>
            )}
        </div>
    );
};

export default Distributions;
