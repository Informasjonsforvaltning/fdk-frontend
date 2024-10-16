import { Frame } from 'jsonld/jsonld-spec';

export const conceptFrame: Frame = {
    '@context': {
        skos: 'http://www.w3.org/2004/02/skos/core#',
        rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        euvoc: 'http://publications.europa.eu/ontology/euvoc#',
        label: {
            '@id': 'skos:prefLabel',
            '@container': '@language',
        },
        directDefinition: {
            '@id': 'skos:definition',
            '@container': '@language',
        },
    },
    'skos:prefLabel': { '@explicit': true },
    'skos:definition': { '@explicit': true },
};

export const xlNoteFrame: Frame = {
    '@context': {
        skos: 'http://www.w3.org/2004/02/skos/core#',
        rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        euvoc: 'http://publications.europa.eu/ontology/euvoc#',
        xlDefinitionText: {
            '@id': 'rdf:value',
            '@container': '@language',
        },
    },
    'rdf:value': { '@explicit': true },
};
