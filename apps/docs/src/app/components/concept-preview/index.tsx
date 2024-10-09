import { PropsWithChildren } from 'react';

import { type Locale } from '@fdk-frontend/dictionaries';
import ConceptPreviewBase from '@fdk-frontend/ui/concept-preview-base';
import { getSkosLabel, getSkosDefinition } from '@fdk-frontend/utils/concept-preview-utils';

import styles from './concept-preview.module.css';
import { getConceptAsJsonLd } from '@fdk-frontend/data-access/server';

type ConceptPreviewProps = PropsWithChildren & {
    uri: string;
    lang: Locale['code'];
};


const exampleConceptInteroperabilittet = {
    "@graph": [
        {
            "@id": "https://concept-catalog.fellesdatakatalog.digdir.no/collections/991825827/concepts/810ac7ef-b0a0-47a9-b109-ea4f8d77132a",
            "skos:prefLabel": [
                {
                    "@language": "nb",
                    "@value": "Interoperabilitet (nb)"
                },
                {
                    "@language": "nn",
                    "@value": "Interoperabilitet (nn)"
                }
            ],
            "dct:identifier": "https://concept-catalog.fellesdatakatalog.digdir.no/collections/991825827/concepts/810ac7ef-b0a0-47a9-b109-ea4f8d77132a",
            "http://publications.europa.eu/ontology/euvoc#xlDefinition": {
                "@id": "https://concept-catalog.fellesdatakatalog.digdir.no/collections/991825827/concepts/810ac7ef-b0a0-47a9-b109-ea4f8d77132a/.well-known/skolem/4054f359-e513-34de-8123-daee08b39e7d"
            },
            "@type": "skos:Concept"
        },
        {
            "@id": "https://concept-catalog.fellesdatakatalog.digdir.no/collections/991825827/concepts/810ac7ef-b0a0-47a9-b109-ea4f8d77132a/.well-known/skolem/4054f359-e513-34de-8123-daee08b39e7d",
            "rdf:value": [{
                "@language": "nb",
                "@value": "evnen til ett produkt eller system, som har alle grensesnitt fullstendig oppgitt, til å samhandle og fungere med andre produkter eller systemer, uten noen tilgang- og implementasjonsrestriksjoner"
            }, {
                "@language": "nn",
                "@value": "evna til eit produkt eller system, som har alle grensesnitt fullstendig oppgjeve, til å samhandle og fungere med andre produkt eller system, utan nokon tilgang- og implementasjonsrestriksjonar"
            }],
            "@type": "http://publications.europa.eu/ontology/euvoc#XlNote"
        }
    ],
    "@context": {
        "schema": "http://schema.org/",
        "adms": "http://www.w3.org/ns/adms#",
        "iso": "http://iso.org/25012/2008/dataquality/",
        "spdx": "http://spdx.org/rdf/terms#",
        "owl": "http://www.w3.org/2002/07/owl#",
        "skosxl": "http://www.w3.org/2008/05/skos-xl#",
        "dqv": "http://www.w3.org/ns/dqv#",
        "skosno": "https://data.norge.no/vocabulary/skosno#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "skos": "http://www.w3.org/2004/02/skos/core#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "vcard": "http://www.w3.org/2006/vcard/ns#",
        "xkos": "http://rdf-vocabulary.ddialliance.org/xkos#",
        "oa": "http://www.w3.org/ns/prov#",
        "dct": "http://purl.org/dc/terms/",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "dcat": "http://www.w3.org/ns/dcat#",
        "foaf": "http://xmlns.com/foaf/0.1/"
    }
}

const ConceptPreview = async ({ uri, lang, children }: ConceptPreviewProps) => {
    console.log("Uri:", uri)
    const concept = await getConceptAsJsonLd(uri).catch((error) => { console.error("Error getting concept as JSON-LD:", error) })
    const conceptLabel = await getSkosLabel(concept, lang)
    const conceptDefinition = await getSkosDefinition(concept, lang)
    return (
        <ConceptPreviewBase
            label={conceptLabel || "Label mangler"}
            definition={conceptDefinition || "Definisjon mangler"}
            uri={uri}
        >
            <span className={styles.conceptPreview}>{children}</span>
        </ConceptPreviewBase>
    )
};

export default ConceptPreview;
