import {
    type DatasetReference,
    type Entity
} from '@fdk-frontend/fdk-types';

export type LinkObjectType = {
    href?: string;
    className?: string;
    external?: boolean;
    text?: string;
    undecoratedText?: string;
};

export type CatalogTypes = 'datasets' | 'apis' | 'terms' | 'information-models' | 'services-events' | 'ai';

export type JSONValue = any;

interface PopulatedDatasetReference {
  reference: DatasetReference;
  resource: Entity;
}