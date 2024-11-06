import { Heading, ChipGroup, ChipToggle } from '@digdir/designsystemet-react';

import GeneralDetails from './components/general-details';
import ContactDetails from './components/contact-details';
import ContentDetails from './components/content-details';
import LegalDetails from './components/legal-details';
import ConceptDetails from './components/concept-details';
import RelationDetails from './components/relation-details';

import styles from './dataset-details.module.scss';

const DatasetDetails = ({ details }: any) => {
    const { sections } = details;

    const general = sections.find((s: any) => s.sectionTitle === 'Generelt');
    const contact = sections.find((s: any) => s.sectionTitle === 'Kontaktinformasjon');
    const content = sections.find((s: any) => s.sectionTitle === 'Innhold');
    const legal = sections.find((s: any) => s.sectionTitle === 'Lovhjemler');
    const concept = sections.find((s: any) => s.sectionTitle === 'Begreper brukt i datasett');
    const relation = sections.find((s: any) => s.sectionTitle === 'Relasjoner til datasett');

    return (
        <div className={styles.details}>
            <GeneralDetails fields={general.fields} />
            <ContactDetails fields={contact.fields} />
            <ContentDetails fields={content.fields} />
            <LegalDetails fields={legal.fields} />
            <ConceptDetails fields={concept.fields} />
            <RelationDetails fields={relation.fields} />
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
    );
};

export default DatasetDetails;
