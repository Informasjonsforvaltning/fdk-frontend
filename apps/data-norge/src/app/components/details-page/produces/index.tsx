'use client';
import cn from 'classnames';
import { Card, Details, Heading } from '@digdir/designsystemet-react';
import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import { type JSONValue } from '@fdk-frontend/types';
import { sumArrayLengths, printLocaleValue } from '@fdk-frontend/utils';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { type PublicServiceOutput, type SearchObject } from '@fellesdatakatalog/types';
import { Badge, Hstack, PlaceholderBox, ActionButton, DownloadButton } from '@fdk-frontend/ui';
import styles from './produces.module.scss';
// import DistributionDetails from './components/distribution-details';
// import DistributionHeader from './components/distribution-header';
// import ApiHeader from './components/api-header';
// import ApiDetails from './components/api-details';

export type ProducesProps = {
    produces?: PublicServiceOutput[];
    exampleData?: JSONValue[];
    apis?: JSONValue[];
    className?: string;
    locale: LocaleCodes;
    dictionaries: {
        common: Dictionary;
        detailsPage: Dictionary;
    };
    // resolvedDistributionDataServices?: SearchObject[];
    // resolvedDistributionInformationModels?: SearchObject[];
};

const Produces = ({
    exampleData = [],
    produces = [],
    apis = [],
    className,
    locale,
    dictionaries,
    // resolvedDistributionDataServices = [],
    // resolvedDistributionInformationModels = [],
    ...props
}: ProducesProps) => {
    return (
        <div className={cn(styles.produces, className)}>
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
                    {produces &&
                        produces.map((output) => (
                            <div
                                key={output.identifier}
                                className={styles.accordionWrapper}
                            >
                                <Details className={styles.accordionItem}>
                                    <Details.Summary>
                                        <div className={styles.headerContent}>
                                            <span className={styles.title}>
                                                {printLocaleValue(locale, output.name) ||
                                                    dictionaries.detailsPage.produces.header.nameless}
                                                {/*hasTags && (
                                                    <DistributionTags
                                                        distribution={distribution}
                                                        exampleData={exampleData}
                                                        dictionary={dictionary}
                                                    />
                                                )*/}
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
                                {/*distribution.accessURL && (
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
                                )*/}
                            </div>
                        ))}
                    {/*exampleData &&
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
                        ))*/}
                </Card>
            ) : (
                <PlaceholderBox>{dictionaries.detailsPage.distributions.placeholder}</PlaceholderBox>
            )}
        </div>
    );
};

export default Produces;
