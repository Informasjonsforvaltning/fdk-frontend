import type { Meta, StoryObj } from '@storybook/react';
import { type SearchObject } from '@fellesdatakatalog/types';
import EntityTeaser from './index';

const meta: Meta<typeof EntityTeaser> = {
    title: 'Components/EntityTeaser',
    component: EntityTeaser,
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EntityTeaser>;

const datasetEntity: SearchObject = {
    id: 'dataset-1',
    uri: 'https://data.norge.no/datasets/dataset-1',
    title: 'Kart over kulturminner i Norge',
    searchType: 'DATASET',
    description: 'Åpne data fra Riksantikvaren med kulturminner og fornminner.',
    publisher: { id: '991825827', prefLabel: { nb: 'Kulturrådet' } },
    keyword: ['Skog og landbruk', 'Jordbruk', 'Industri']
} as SearchObject;

const dataServiceEntity: SearchObject = {
    id: 'api-1',
    uri: 'https://data.norge.no/dataservices/api-1',
    title: 'Kartverket API for stedsnavn',
    searchType: 'DATA_SERVICE',
    description: 'Søk og hent stedsnavn fra Norges offisielle stedsnavnregister.',
    publisher: { id: '889640782', prefLabel: { nb: 'Kartverket' } },
} as SearchObject;

const conceptEntity: SearchObject = {
    id: 'concept-1',
    uri: 'https://data.norge.no/concepts/datakatalog',
    title: 'Datakatalog',
    searchType: 'CONCEPT',
    description: 'En datakatalog er en samling metadata som hjelper brukere å finne og forstå data.',
} as SearchObject;

export const Dataset: Story = {
    args: {
        entity: datasetEntity,
    },
};

export const DataService: Story = {
    args: {
        entity: dataServiceEntity,
    },
};

export const Concept: Story = {
    args: {
        entity: conceptEntity,
    },
};
