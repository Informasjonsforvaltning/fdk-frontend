import jsonld, { expand, frame } from 'jsonld';
import { Frame } from 'jsonld/jsonld-spec';
import { type Locale } from '@fdk-frontend/dictionaries';
import { conceptFrame, xlNoteFrame } from './jsonld-frames';

type LangMap = {
    [key: string]: string;
};

const translate = (langMap: LangMap, lang: string) => {
    if (!langMap) return '';
    if (typeof langMap !== 'object') {
        console.error(`langMap is not a object, is of type ${typeof langMap}. Cannot translate`);
        return '';
    }
    return langMap[lang] || '';
};

const frameConcept = async (concept: object, frameDef: Frame): Promise<jsonld.NodeObject> => {
    const framed = await frame(concept, frameDef);
    return framed;
};

const getPrefLabel = (framedConcept: any, lang = 'nb') => {
    const labelLanguageText = framedConcept['label'] as LangMap;
    return translate(labelLanguageText, lang);
};

const getDirectDefinition = (framedConcept: any, lang = 'nb') => {
    const definitionLanguageText = framedConcept['directDefinition'] as LangMap;
    return translate(definitionLanguageText, lang);
};

const getXlDefinition = (framedConcept: any, lang = 'nb') => {
    const xlDefinitionText = framedConcept['xlDefinitionText'] as LangMap;
    return translate(xlDefinitionText, lang);
};

export const getSkosLabel = async (concept: object, lang: Locale['code']) => {
    const framedConcept = await frameConcept(await expand(concept), conceptFrame);
    const conceptLabel = getPrefLabel(framedConcept, lang) || getPrefLabel(framedConcept, 'nb');
    return conceptLabel;
};

export const getSkosDefinition = async (concept: object, lang: Locale['code']) => {
    const framedConcept = await frameConcept(await expand(concept), conceptFrame);
    const framedXlDef = await frameConcept(await expand(concept), xlNoteFrame);

    return (
        getDirectDefinition(framedConcept, lang) ||
        getXlDefinition(framedXlDef, lang) ||
        getDirectDefinition(framedConcept, 'nb') ||
        getXlDefinition(framedXlDef, 'nb')
    );
};
