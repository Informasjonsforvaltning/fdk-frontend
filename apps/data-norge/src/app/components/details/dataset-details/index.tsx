import { useState, createContext } from 'react';
import { Heading, ChipGroup, ChipToggle, Button } from '@digdir/designsystemet-react';
import { EyeSlashIcon, EyeIcon } from '@navikt/aksel-icons';

import GeneralDetails from './components/general-details';
import ContactDetails from './components/contact-details';
import ContentDetails from './components/content-details';
import LegalDetails from './components/legal-details';
import ConceptDetails from './components/concept-details';
// import RelationDetails from './components/relation-details';

import styles from './dataset-details.module.scss';

const DatasetDetailsContext = createContext<{ showEmptyRows: boolean }>({ showEmptyRows: true });

const DatasetDetails = ({ details }: any) => {
    const [showEmptyRows, setShowEmptyRows] = useState<boolean>(true);

    const { sections } = details;

    const general = sections.find((s: any) => s.sectionTitle === 'Generelt');
    const contact = sections.find((s: any) => s.sectionTitle === 'Kontaktinformasjon');
    const content = sections.find((s: any) => s.sectionTitle === 'Innhold');
    const legal = sections.find((s: any) => s.sectionTitle === 'Lovhjemler');
    const concept = sections.find((s: any) => s.sectionTitle === 'Begreper brukt i datasett');
    // const relation = sections.find((s: any) => s.sectionTitle === 'Relasjoner til datasett');

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
                <GeneralDetails fields={general.fields} />
                <ContactDetails fields={contact.fields} />
                <ContentDetails fields={content.fields} />
                <LegalDetails fields={legal.fields} />
                <ConceptDetails fields={concept.fields} />
                {/*<RelationDetails fields={relation.fields} />*/}
                <section className={styles.section}>
                    <Heading
                        level={2}
                        size='xxsmall'
                    >
                        Tema
                    </Heading>
                    <ChipGroup size='sm'>
                        {['Energi', 'Forvaltning og offentlig sektor'].map((theme) => (
                            <ChipToggle key={theme}>{theme}</ChipToggle>
                        ))}
                    </ChipGroup>
                </section>
                <section className={styles.section}>
                    <Heading
                        level={2}
                        size='xxsmall'
                    >
                        Søkeord
                    </Heading>
                    <ChipGroup size='sm'>
                        {['arbeidsledige', 'statistikk', 'arbeidsmarked', 'nav'].map((term) => (
                            <ChipToggle key={term}>{term}</ChipToggle>
                        ))}
                    </ChipGroup>
                </section>
            </div>
        </DatasetDetailsContext.Provider>
    );
};

export default DatasetDetails;
export { DatasetDetailsContext };
