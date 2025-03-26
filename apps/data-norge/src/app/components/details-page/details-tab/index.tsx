import { useState, createContext } from 'react';
import { Heading, Link, ChipGroup, ChipToggle, Button } from '@digdir/designsystemet-react';
import { EyeSlashIcon, EyeIcon } from '@navikt/aksel-icons';
import { type DatasetWithIdentifier, type DatasetScore } from '@fdk-frontend/fdk-types';
import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import PlaceholderBox from '@fdk-frontend/ui/placeholder-box/';
import PlaceholderText from '@fdk-frontend/ui/placeholder-text/';
import GeneralDetails from './components/general-details';
import ContactDetails from './components/contact-details';
import ContentDetails from './components/content-details';
import LegalDetails, { hasLegalBasis } from './components/legal-details';
import ConceptDetails from './components/concept-details';
import RelatedDetails from './components/related-details';
import { printLocaleValue } from '@fdk-frontend/utils';
import styles from './details-tab.module.scss';

const DatasetDetailsTabContext = createContext<{ showEmptyRows: boolean }>({ showEmptyRows: true });

export type DatasetDetailsProps = {
    dataset: DatasetWithIdentifier;
    locale: LocaleCodes;
    dictionary: Dictionary;
    metadataScore?: DatasetScore;
    related?: DatasetWithIdentifier[];
};

const DatasetDetailsTab = ({ dataset, related, locale, dictionary, metadataScore }: DatasetDetailsProps) => {
    const [showEmptyRows, setShowEmptyRows] = useState<boolean>(true);

    return (
        <DatasetDetailsTabContext.Provider value={{ showEmptyRows }}>
            <div className={styles.details}>
                <Button
                    className={styles.toggleButton}
                    variant='tertiary'
                    size='sm'
                    onClick={() => setShowEmptyRows(!showEmptyRows)}
                >
                    {showEmptyRows ? (
                        <>
                            <EyeSlashIcon aria-hidden />
                            {dictionary.details.hideEmptyRows}
                        </>
                    ) : (
                        <>
                            <EyeIcon aria-hidden />
                            {dictionary.details.showEmptyRows}
                        </>
                    )}
                </Button>
                <GeneralDetails
                    dataset={dataset}
                    locale={locale}
                    dictionary={dictionary}
                    metadataScore={metadataScore}
                />
                {!dataset.contactPoint && !showEmptyRows ? null : (
                    <ContactDetails
                        dataset={dataset}
                        locale={locale}
                        dictionary={dictionary}
                    />
                )}
                <ContentDetails
                    dataset={dataset}
                    locale={locale}
                    dictionary={dictionary}
                />
                {!hasLegalBasis(dataset) && !showEmptyRows ? null : (
                    <LegalDetails
                        dataset={dataset}
                        locale={locale}
                        dictionary={dictionary}
                    />
                )}
                {!dataset.subject && !showEmptyRows ? null : (
                    <ConceptDetails
                        dataset={dataset}
                        locale={locale}
                        dictionary={dictionary}
                    />
                )}
                {!related?.length && !showEmptyRows ? null : (
                    <RelatedDetails
                        related={related}
                        locale={locale}
                        dictionary={dictionary}
                    />
                )}
                {!dataset.theme?.length && !showEmptyRows ? null : (
                    <section>
                        <Heading
                            level={2}
                            size='xxsmall'
                        >
                            {dictionary.details.themes}
                        </Heading>
                        {dataset.theme ? (
                            <ChipGroup size='sm'>
                                {dataset.theme.map((theme: any) => (
                                    <Link
                                        key={theme.code}
                                        href={`/datasets&theme=${theme.code}`}
                                    >
                                        <ChipToggle>{printLocaleValue(locale, theme.title)}</ChipToggle>
                                    </Link>
                                ))}
                            </ChipGroup>
                        ) : (
                            <PlaceholderBox>{dictionary.details.noData}</PlaceholderBox>
                        )}
                    </section>
                )}
                {!dataset.keyword?.length && !showEmptyRows ? null : (
                    <section>
                        <Heading
                            level={2}
                            size='xxsmall'
                        >
                            {dictionary.details.keywords}
                        </Heading>
                        {dataset.keyword && dataset.keyword.filter((keyword: any) => keyword[locale]).length ? (
                            <ChipGroup size='sm'>
                                {dataset.keyword
                                    .filter((keyword: any) => keyword[locale])
                                    .map((keyword: any, i: number) => (
                                        <Link
                                            key={`keyword-${i}`}
                                            href={`/datasets&q=${keyword[locale]}`}
                                        >
                                            <ChipToggle>{keyword[locale]}</ChipToggle>
                                        </Link>
                                    ))}
                            </ChipGroup>
                        ) : (
                            <PlaceholderText>{dictionary.details.noData}</PlaceholderText>
                        )}
                    </section>
                )}
            </div>
        </DatasetDetailsTabContext.Provider>
    );
};

export default DatasetDetailsTab;
export { DatasetDetailsTabContext };
