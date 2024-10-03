import { getSkosLabel, getSkosDefinition } from '.';

const baseConceptAsJsonLd = {
    '@graph': [
        {
            '@id': 'https://concept-catalog.fellesdatakatalog.digdir.no/collections/991825827/concepts/810ac7ef-b0a0-47a9-b109-ea4f8d77132a',
            'skos:prefLabel': [
                {
                    '@language': 'nb',
                    '@value': 'Interoperabilitet',
                },
                {
                    '@language': 'nn',
                    '@value': 'Interoperabilitet',
                },
                {
                    '@language': 'en',
                    '@value': 'Interoperability',
                },
            ],
            'http://publications.europa.eu/ontology/euvoc#xlDefinition': {
                '@id': 'https://concept-catalog.fellesdatakatalog.digdir.no/collections/991825827/concepts/810ac7ef-b0a0-47a9-b109-ea4f8d77132a/.well-known/skolem/4054f359-e513-34de-8123-daee08b39e7d',
            },
            '@type': 'skos:Concept',
        },
        {
            '@id': 'https://concept-catalog.fellesdatakatalog.digdir.no/collections/991825827/concepts/810ac7ef-b0a0-47a9-b109-ea4f8d77132a/.well-known/skolem/4054f359-e513-34de-8123-daee08b39e7d',
            'rdf:value': [
                {
                    '@language': 'nb',
                    '@value': 'Definisjon på samhandlingsevne',
                },
                {
                    '@language': 'nn',
                    '@value': 'Definisjon på samhandlingsevne',
                },
                {
                    '@language': 'en',
                    '@value': 'Definition of interoperability',
                },
            ],
            '@type': 'http://publications.europa.eu/ontology/euvoc#XlNote',
        },
    ],
    '@context': {
        skos: 'http://www.w3.org/2004/02/skos/core#',
        rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    },
};

const missingEnglishLangConcept = {
    '@graph': [
        {
            '@id': 'https://concept-catalog.fellesdatakatalog.digdir.no/collections/991825827/concepts/810ac7ef-b0a0-47a9-b109-ea4f8d77132a',
            'skos:prefLabel': [
                {
                    '@language': 'nb',
                    '@value': 'Interoperabilitet',
                },
                {
                    '@language': 'nn',
                    '@value': 'Interoperabilitet',
                },
            ],
            'http://publications.europa.eu/ontology/euvoc#xlDefinition': {
                '@id': 'https://concept-catalog.fellesdatakatalog.digdir.no/collections/991825827/concepts/810ac7ef-b0a0-47a9-b109-ea4f8d77132a/.well-known/skolem/4054f359-e513-34de-8123-daee08b39e7d',
            },
            '@type': 'skos:Concept',
        },
        {
            '@id': 'https://concept-catalog.fellesdatakatalog.digdir.no/collections/991825827/concepts/810ac7ef-b0a0-47a9-b109-ea4f8d77132a/.well-known/skolem/4054f359-e513-34de-8123-daee08b39e7d',
            'rdf:value': [
                {
                    '@language': 'nb',
                    '@value': 'Definisjon på samhandlingsevne',
                },
                {
                    '@language': 'nn',
                    '@value': 'Definisjon på samhandlingsevne',
                },
            ],
            '@type': 'http://publications.europa.eu/ontology/euvoc#XlNote',
        },
    ],
    '@context': {
        skos: 'http://www.w3.org/2004/02/skos/core#',
        rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    },
};

test('should pass', async () => {
    expect(true).toBe(true);
});

test('getSkosLabel should return the Norwegian Bokmål label', async () => {
    const result = await getSkosLabel(baseConceptAsJsonLd, 'nb');
    expect(result).toBe('Interoperabilitet');
});

test('getSkosLabel should return the Norwegian Nynorsk label', async () => {
    const result = await getSkosLabel(baseConceptAsJsonLd, 'nn');
    expect(result).toBe('Interoperabilitet');
});

test('getSkosLabel should return the English label', async () => {
    const result = await getSkosLabel(baseConceptAsJsonLd, 'en');
    expect(result).toBe('Interoperability');
});

test('getSkosDefinition should return the Norwegian Bokmål definition', async () => {
    const result = await getSkosDefinition(baseConceptAsJsonLd, 'nb');
    expect(result).toBe('Definisjon på samhandlingsevne');
});

test('getSkosDefinition should return the Norwegian Nynorsk definition', async () => {
    const result = await getSkosDefinition(baseConceptAsJsonLd, 'nn');
    expect(result).toBe('Definisjon på samhandlingsevne');
});

test('getSkosDefinition should return the English definition', async () => {
    const result = await getSkosDefinition(baseConceptAsJsonLd, 'en');
    expect(result).toBe('Definition of interoperability');
});

test('getSkosLabel should fallback to Norwegian Bokmål when missing language', async () => {
    const result = await getSkosLabel(missingEnglishLangConcept, 'en');
    expect(result).toBe('Interoperabilitet');
});

test('getSkosDefinition should fallback to Norwegian Bokmål when missing language', async () => {
    const result = await getSkosDefinition(missingEnglishLangConcept, 'en');
    expect(result).toBe('Definisjon på samhandlingsevne');
});
