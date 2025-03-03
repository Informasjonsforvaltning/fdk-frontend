export type LinkObjectType = {
    href?: string;
    className?: string;
    external?: boolean;
    text?: string;
    undecoratedText?: string;
};

export type CatalogTypes = 'datasets' | 'apis' | 'terms' | 'information-models' | 'services-events' | 'ai';

export type JSONValue = any;

export interface Dataset {
  id: string;
  catalogId: string;
  _lastModified: string;
}

