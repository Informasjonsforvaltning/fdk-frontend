import { PropsWithChildren } from 'react';

import { getDictionary, type Locale } from '@fdk-frontend/dictionaries';
import ConceptPreviewBase from '@fdk-frontend/ui/concept-preview-base';
import { getSkosLabel, getSkosDefinition } from '@fdk-frontend/utils/concept-preview-utils';

import styles from './concept-preview.module.css';
import { getConceptAsJsonLd } from '@fdk-frontend/data-access/server';

export type ConceptPreviewProps = PropsWithChildren & {
    uri: string;
    lang: Locale['code'];
};

const ConceptPreview = async ({ uri, lang, children }: ConceptPreviewProps) => {
    const docsDictionary = await getDictionary(lang, 'docs');
    const concept = await getConceptAsJsonLd(uri).catch((error) => {
        console.error('Error getting concept as JSON-LD:', error);
    });
    const conceptLabel = concept ? await getSkosLabel(concept, lang) : undefined;
    const conceptDefinition = concept ? await getSkosDefinition(concept, lang) : undefined;
    return (
        <ConceptPreviewBase
            label={conceptLabel || docsDictionary.conceptPreview.labelMissing}
            definition={conceptDefinition || docsDictionary.conceptPreview.definitionMissing}
            uri={uri}
            goToDataNorgeText={docsDictionary.conceptPreview.goToDatanorge}
        >
            <span className={styles.conceptPreview}>{children}</span>
        </ConceptPreviewBase>
    );
};

export default ConceptPreview;
