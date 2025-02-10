import { useState, createContext } from 'react';
import { Heading, Link, ChipGroup, ChipToggle, Button } from '@digdir/designsystemet-react';
import { EyeSlashIcon, EyeIcon } from '@navikt/aksel-icons';
import { type JSONValue } from '@fdk-frontend/types';
import { type LocaleCodes } from '@fdk-frontend/dictionaries';
import PlaceholderBox from '../placeholder-box/';
import PlaceholderText from '../placeholder-text/';
import GeneralDetails from './components/general-details';
import ContactDetails from './components/contact-details';
import ContentDetails from './components/content-details';
import LegalDetails, { hasLegalBasis } from './components/legal-details';
import ConceptDetails from './components/concept-details';
import { printLocaleValue } from './utils';
import styles from './dataset-details.module.scss';

const DatasetDetailsContext = createContext<{ showEmptyRows: boolean }>({ showEmptyRows: true });

export type DatasetDetailsProps = {
    dataset: JSONValue;
    locale: LocaleCodes;
    metadataScore?: JSONValue;
}

const DatasetDetails = ({ dataset, locale, metadataScore }: DatasetDetailsProps) => {

    const [showEmptyRows, setShowEmptyRows] = useState<boolean>(true);

    return (
        <DatasetDetailsContext.Provider value={{ showEmptyRows }}>
            <div className={styles.details}>
                <Button
                    className={styles.toggleButton}
                    variant='tertiary'
                    size='sm'
                    onClick={() => setShowEmptyRows(!showEmptyRows)}
                >
                    {showEmptyRows ? (
                        <>
                            <EyeSlashIcon />
                            Skjul tomme rader
                        </>
                    ) : (
                        <>
                            <EyeIcon />
                            Vis tomme rader
                        </>
                    )}
                </Button>
                <GeneralDetails
                    dataset={dataset}
                    locale={locale}
                    metadataScore={metadataScore}
                />
                {
                    (!dataset.contactPoint && !showEmptyRows) ? null :
                    <ContactDetails
                        dataset={dataset}
                        locale={locale}
                    />
                }
                <ContentDetails
                    dataset={dataset}
                    locale={locale}
                />
                {
                    (!hasLegalBasis(dataset) && !showEmptyRows) ? null :
                    <LegalDetails
                        dataset={dataset}
                        locale={locale}
                    />
                }
                {
                    (!dataset.subject && !showEmptyRows) ? null :
                    <ConceptDetails
                        dataset={dataset}
                        locale={locale}
                    />
                }
                <section>
                    <Heading
                        level={4}
                        size='xxsmall'
                    >
                        Tema
                    </Heading>
                    {
                        dataset.theme ? 
                        <ChipGroup size='sm'>
                            {
                                dataset.theme.map((theme: any) => 
                                    <Link key={theme.code} href={`/datasets&theme=${theme.code}`}>
                                        <ChipToggle>
                                            {printLocaleValue(theme.title, locale)}
                                        </ChipToggle>
                                    </Link>
                                )
                            }
                        </ChipGroup>:
                        <PlaceholderBox>Ikke oppgitt</PlaceholderBox>
                    }
                </section>
                <section>
                    <Heading
                        level={4}
                        size='xxsmall'
                    >
                        Søkeord
                    </Heading>
                    {
                        dataset.keyword && dataset.keyword.filter((keyword: any) => keyword[locale]).length ? 
                        <ChipGroup size='sm'>
                            {
                                dataset.keyword.filter((keyword: any) => keyword[locale]).map((keyword: any, i: number) => 
                                    <Link key={`keyword-${i}`} href={`/datasets&q=${keyword[locale]}`}>
                                        <ChipToggle>
                                            {keyword[locale]}
                                        </ChipToggle>
                                    </Link>
                                )
                            }
                        </ChipGroup>:
                        <PlaceholderText>Ikke oppgitt</PlaceholderText>
                    }
                </section>
            </div>
        </DatasetDetailsContext.Provider>
    );
};

export default DatasetDetails;
export { DatasetDetailsContext };
