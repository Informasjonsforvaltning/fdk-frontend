import { type DatasetReference, type Dataset } from '@fellesdatakatalog/types';

export type LinkObjectType = {
    href?: string;
    className?: string;
    external?: boolean;
    text?: string;
    undecoratedText?: string;
};

export type CatalogTypes = 'datasets' | 'apis' | 'terms' | 'information-models' | 'services-events' | 'ai';

export type JSONValue = any;

export interface PopulatedDatasetReference {
    reference: DatasetReference;
    resource: Dataset;
}
