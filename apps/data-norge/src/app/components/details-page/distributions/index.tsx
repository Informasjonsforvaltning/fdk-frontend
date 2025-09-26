'use client';
import cn from 'classnames';
import { Details, Heading } from '@digdir/designsystemet-react';
import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import { type JSONValue } from '@fdk-frontend/types';
import { sumArrayLengths, printLocaleValue } from '@fdk-frontend/utils';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { type SearchObject } from '@fellesdatakatalog/types';
import { Badge, Hstack, PlaceholderBox, ActionButton, DownloadButton } from '@fdk-frontend/ui';
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
    return false;
    return (
        <div className={cn(styles.distributions, className)}>
            <Heading
                level={2}
                size='xxsmall'
            >
                <Hstack>
                    <div>{dictionaries.detailsPage.distributions.title}</div>
                    <Badge>{sumArrayLengths(datasets, exampleData)}</Badge>
                </Hstack>
            </Heading>
            {sumArrayLengths(datasets, exampleData) > 0 ? (
                <Details border>
                    {datasets && datasets.map((distribution, index) => (
                        <Details.Item
                            className={styles.accordionItem}
                            key={`${distribution.accessURL}-${index}`}
                        >
                            <Details.Header
                                level={3}
                                className={styles.header}
                            >
                                <DistributionHeader
                                    distribution={distribution}
                                    locale={locale}
                                    dictionary={dictionaries.detailsPage}
                                />
                            </Details.Header>
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
                            <Details.Content className={styles.content}>
                                <DistributionDetails
                                    distribution={distribution}
                                    locale={locale}
                                    dictionaries={dictionaries}
                                    resolvedDistributionDataServices={resolvedDistributionDataServices}
                                    resolvedDistributionInformationModels={resolvedDistributionInformationModels}
                                />
                            </Details.Content>
                        </Details.Item>
                    ))}
                    {exampleData &&
                        exampleData.map((example, index) => (
                            <Details.Item
                                className={styles.accordionItem}
                                key={example.accessURL}
                            >
                                <Details.Header
                                    level={3}
                                    className={styles.header}
                                >
                                    <DistributionHeader
                                        distribution={example}
                                        locale={locale}
                                        dictionary={dictionaries.detailsPage}
                                        exampleData={true}
                                    />
                                </Details.Header>
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
                                <Details.Content className={styles.content}>
                                    <DistributionDetails
                                        distribution={example}
                                        locale={locale}
                                        dictionaries={dictionaries}
                                        resolvedDistributionDataServices={resolvedDistributionDataServices}
                                        resolvedDistributionInformationModels={resolvedDistributionInformationModels}
                                    />
                                </Details.Content>
                            </Details.Item>
                        ))}
                </Details>
            ) : (
                <PlaceholderBox>{dictionaries.detailsPage.distributions.placeholder}</PlaceholderBox>
            )}
            <Heading
                level={2}
                size='xxsmall'
            >
                <Hstack>
                    <div>{dictionaries.detailsPage.apis.title}</div>
                    <Badge>{apis.length}</Badge>
                </Hstack>
            </Heading>
            {apis && apis.length ? (
                <Details border>
                    {apis.map((api, index) => (
                        <Details.Item
                            className={styles.accordionItem}
                            key={api.id}
                        >
                            <Details.Header
                                level={3}
                                className={styles.header}
                            >
                                <ApiHeader
                                    api={api}
                                    locale={locale}
                                    dictionary={dictionaries.detailsPage}
                                />
                            </Details.Header>
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
                            <Details.Content className={styles.content}>
                                <ApiDetails
                                    api={api}
                                    locale={locale}
                                    dictionary={dictionaries.detailsPage}
                                />
                            </Details.Content>
                        </Details.Item>
                    ))}
                </Details>
            ) : (
                <PlaceholderBox>{dictionaries.detailsPage.apis.placeholder}</PlaceholderBox>
            )}
        </div>
    );
};

export default Distributions;
