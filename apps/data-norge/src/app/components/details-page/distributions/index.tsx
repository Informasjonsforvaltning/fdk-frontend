'use client';
import cn from 'classnames';
import { Accordion, Heading } from '@digdir/designsystemet-react';
import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import { type JSONValue } from '@fdk-frontend/types';
import { sumArrayLengths, printLocaleValue } from '@fdk-frontend/utils';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { type SearchObject } from '@fdk-frontend/fdk-types';
import Badge from '@fdk-frontend/ui/badge';
import HStack from '@fdk-frontend/ui/hstack';
import PlaceholderBox from '@fdk-frontend/ui/placeholder-box';
import ActionButton from '@fdk-frontend/ui/action-button';
import DownloadButton from '@fdk-frontend/ui/download-button';
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
    dictionaries: {
        common: Dictionary;
        detailsPage: Dictionary;
    };
    resolvedDistributionDataServices?: SearchObject[];
    resolvedDistributionInformationModels?: SearchObject[];
};

const Distributions = ({
    exampleData = [],
    datasets = [],
    apis = [],
    className,
    locale,
    dictionaries,
    resolvedDistributionDataServices = [],
    resolvedDistributionInformationModels = [],
    ...props
}: DistributionsProps) => {
    return (
        <div className={cn(styles.distributions, className)}>
            <Heading
                level={2}
                size='xxsmall'
            >
                <HStack>
                    <div>{dictionaries.detailsPage.distributions.title}</div>
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
                                    dictionary={dictionaries.detailsPage}
                                />
                            </Accordion.Header>
                            {distribution.accessURL && (
                                <DownloadButton
                                    uris={distribution.accessURL}
                                    className={styles.actionButton}
                                    modalTitle={
                                        printLocaleValue(locale, distribution.title) ||
                                        dictionaries.detailsPage.distributions.header.nameless
                                    }
                                    dictionary={dictionaries.detailsPage}
                                    locale={locale}
                                >
                                    {dictionaries.detailsPage.distributions.header.downloadBtnLabel}
                                </DownloadButton>
                            )}
                            <Accordion.Content className={styles.content}>
                                <DistributionDetails
                                    distribution={distribution}
                                    locale={locale}
                                    dictionaries={dictionaries}
                                    resolvedDistributionDataServices={resolvedDistributionDataServices}
                                    resolvedDistributionInformationModels={resolvedDistributionInformationModels}
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
                                        dictionary={dictionaries.detailsPage}
                                        exampleData={true}
                                    />
                                </Accordion.Header>
                                <DownloadButton
                                    uris={example.accessURL}
                                    className={styles.actionButton}
                                    modalTitle={
                                        printLocaleValue(locale, example.title) ||
                                        dictionaries.detailsPage.distributions.header.nameless
                                    }
                                    dictionary={dictionaries.detailsPage}
                                    locale={locale}
                                >
                                    {dictionaries.detailsPage.distributions.header.downloadBtnLabel}
                                </DownloadButton>
                                <Accordion.Content className={styles.content}>
                                    <DistributionDetails
                                        distribution={example}
                                        locale={locale}
                                        dictionaries={dictionaries}
                                        resolvedDistributionDataServices={resolvedDistributionDataServices}
                                        resolvedDistributionInformationModels={resolvedDistributionInformationModels}
                                    />
                                </Accordion.Content>
                            </Accordion.Item>
                        ))}
                </Accordion>
            ) : (
                <PlaceholderBox>{dictionaries.detailsPage.distributions.placeholder}</PlaceholderBox>
            )}
            <Heading
                level={2}
                size='xxsmall'
            >
                <HStack>
                    <div>{dictionaries.detailsPage.apis.title}</div>
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
                                    dictionary={dictionaries.detailsPage}
                                />
                            </Accordion.Header>
                            <ActionButton
                                uri={`/data-services/${api.id}`}
                                className={styles.actionButton}
                            >
                                {dictionaries.detailsPage.apis.header.gotoBtn}
                                <ArrowRightIcon
                                    aria-hidden
                                    fontSize='1.2em'
                                />
                            </ActionButton>
                            <Accordion.Content className={styles.content}>
                                <ApiDetails
                                    api={api}
                                    locale={locale}
                                    dictionary={dictionaries.detailsPage}
                                />
                            </Accordion.Content>
                        </Accordion.Item>
                    ))}
                </Accordion>
            ) : (
                <PlaceholderBox>{dictionaries.detailsPage.apis.placeholder}</PlaceholderBox>
            )}
        </div>
    );
};

export default Distributions;
