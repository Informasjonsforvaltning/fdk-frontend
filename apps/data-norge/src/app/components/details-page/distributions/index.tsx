'use client';
import cn from 'classnames';
import { Card, Details, Heading } from '@digdir/designsystemet-react';
import { type LocaleCodes, type Localization } from '@fdk-frontend/localization';
import { type JSONValue } from '@fdk-frontend/types';
import { sumArrayLengths, printLocaleValue } from '@fdk-frontend/utils';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { type SearchObject, type DataService, type Distribution } from '@fellesdatakatalog/types';
import { Badge, Hstack, PlaceholderBox, ActionButton, DownloadButton } from '@fdk-frontend/ui';
import styles from './distributions.module.scss';
import DistributionDetails from './components/distribution-details';
import DistributionHeader from './components/distribution-header';
import ApiHeader from './components/api-header';
import ApiDetails from './components/api-details';

export type DistributionsProps = {
    datasets?: JSONValue[];
    exampleData?: JSONValue[];
    apis?: DataService[];
    isRelatedToTransportportal?: boolean;
    className?: string;
    locale: LocaleCodes;
    dictionaries: {
        common: Localization;
        detailsPage: Localization;
    };
    resolvedDistributionDataServices?: SearchObject[];
    resolvedDistributionInformationModels?: SearchObject[];
};

const Distributions = ({
    exampleData = [],
    datasets = [],
    apis = [],
    isRelatedToTransportportal = false,
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
                data-size='xs'
            >
                <Hstack>
                    <div>{dictionaries.detailsPage.distributions.title}</div>
                    <Badge>{sumArrayLengths(datasets, exampleData)}</Badge>
                </Hstack>
            </Heading>
            {sumArrayLengths(datasets, exampleData) > 0 ? (
                <Card>
                    {datasets &&
                        datasets.map((distribution: Distribution, index) => (
                            <div
                                key={`distribution-${index}`}
                                className={styles.accordionWrapper}
                            >
                                <Details
                                    className={styles.accordionItem}
                                    key={`${distribution.accessURL}-${index}`}
                                >
                                    <Details.Summary>
                                        <DistributionHeader
                                            distribution={distribution}
                                            locale={locale}
                                            dictionary={dictionaries.detailsPage}
                                        />
                                    </Details.Summary>
                                    <Details.Content className={styles.content}>
                                        <DistributionDetails
                                            distribution={distribution}
                                            locale={locale}
                                            dictionaries={dictionaries}
                                            isRelatedToTransportportal={isRelatedToTransportportal}
                                            resolvedDistributionDataServices={resolvedDistributionDataServices}
                                            resolvedDistributionInformationModels={
                                                resolvedDistributionInformationModels
                                            }
                                        />
                                    </Details.Content>
                                </Details>
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
                            </div>
                        ))}
                    {exampleData &&
                        exampleData.map((example, index) => (
                            <div
                                key={`example-${index}`}
                                className={styles.accordionWrapper}
                            >
                                <Details
                                    className={styles.accordionItem}
                                    key={example.accessURL}
                                >
                                    <Details.Summary>
                                        <DistributionHeader
                                            distribution={example}
                                            locale={locale}
                                            dictionary={dictionaries.detailsPage}
                                            exampleData={true}
                                        />
                                    </Details.Summary>
                                    <Details.Content className={styles.content}>
                                        <DistributionDetails
                                            distribution={example}
                                            locale={locale}
                                            dictionaries={dictionaries}
                                            isRelatedToTransportportal={isRelatedToTransportportal}
                                            resolvedDistributionDataServices={resolvedDistributionDataServices}
                                            resolvedDistributionInformationModels={
                                                resolvedDistributionInformationModels
                                            }
                                        />
                                    </Details.Content>
                                </Details>
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
                            </div>
                        ))}
                </Card>
            ) : (
                <PlaceholderBox>{dictionaries.detailsPage.distributions.placeholder}</PlaceholderBox>
            )}
            <Heading
                level={2}
                data-size='xs'
            >
                <Hstack>
                    <div>{dictionaries.detailsPage.apis.title}</div>
                    <Badge>{apis.length}</Badge>
                </Hstack>
            </Heading>
            {apis && apis.length ? (
                <Card>
                    {apis.map((api: DataService, index) => (
                        <div
                            key={`api-${index}`}
                            className={styles.accordionWrapper}
                        >
                            <Details
                                className={styles.accordionItem}
                                key={api.id}
                            >
                                <Details.Summary>
                                    <ApiHeader
                                        api={api}
                                        locale={locale}
                                        dictionary={dictionaries.detailsPage}
                                    />
                                </Details.Summary>
                                <Details.Content className={styles.content}>
                                    <ApiDetails
                                        api={api}
                                        locale={locale}
                                        dictionary={dictionaries.detailsPage}
                                    />
                                </Details.Content>
                            </Details>
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
                        </div>
                    ))}
                </Card>
            ) : (
                <PlaceholderBox>{dictionaries.detailsPage.apis.placeholder}</PlaceholderBox>
            )}
        </div>
    );
};

export default Distributions;
