'use client';
import cn from 'classnames';
import { Card, Details, Heading } from '@digdir/designsystemet-react';
import { type LocaleCodes, type Localization } from '@fdk-frontend/localization';
import { type JSONValue } from '@fdk-frontend/types';
import { sumArrayLengths } from '@fdk-frontend/utils';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { type SearchObject, type DataService, type Distribution } from '@fellesdatakatalog/types';
import { Badge, Hstack, PlaceholderBox, ActionButton } from '@fdk-frontend/ui';
import styles from './distributions.module.scss';
import DistributionList from './components/dataset-details';
import ExampleDataDetails from './components/example-data-details';
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
                <Card className={styles.listContainer}>
                    {datasets &&
                        datasets.map((distribution: Distribution, index) => (
                            <DistributionList
                                key={`distribution-${index}`}
                                distribution={distribution}
                                locale={locale}
                                dictionaries={dictionaries}
                                isRelatedToTransportportal={isRelatedToTransportportal}
                                resolvedDistributionDataServices={resolvedDistributionDataServices}
                                resolvedDistributionInformationModels={resolvedDistributionInformationModels}
                            />
                        ))}
                    {exampleData &&
                        exampleData.map((example: Distribution, index) => (
                            <ExampleDataDetails
                                key={`example-${index}`}
                                distribution={example}
                                locale={locale}
                                dictionaries={dictionaries}
                                isRelatedToTransportportal={isRelatedToTransportportal}
                                resolvedDistributionDataServices={resolvedDistributionDataServices}
                                resolvedDistributionInformationModels={resolvedDistributionInformationModels}
                            />
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
                <Card className={styles.listContainer}>
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
                                uri={`/${locale}/data-services/${api.id}`}
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
