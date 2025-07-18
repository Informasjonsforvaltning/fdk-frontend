'use client';

import Script from 'next/script';
import { type LocaleCodes } from '@fdk-frontend/dictionaries';
import { type DatasetWithIdentifier } from '@fellesdatakatalog/types';
import { printLocaleValue, getDatasetSlug } from '@fdk-frontend/utils';

export type DatasetStructuredDataProps = {
    dataset: DatasetWithIdentifier;
    locale: LocaleCodes;
    baseUri: string;
};

export default function DatasetStructuredData({ dataset, locale, baseUri }: DatasetStructuredDataProps) {
    // Safely sanitize and prepare structured data
    const sanitizeString = (str: string | undefined): string | undefined => {
        if (!str) return undefined;
        // Remove any potentially dangerous characters
        return str.replace(/[<>]/g, '').trim();
    };

    const sanitizeArray = (arr: any[] | undefined): any[] | undefined => {
        if (!arr || !Array.isArray(arr)) return undefined;
        return arr.map(item => {
            if (typeof item === 'string') {
                return sanitizeString(item);
            }
            if (typeof item === 'object' && item !== null) {
                return Object.keys(item).reduce((acc, key) => {
                    const value = item[key];
                    if (typeof value === 'string') {
                        acc[key] = sanitizeString(value);
                    } else if (Array.isArray(value)) {
                        acc[key] = sanitizeArray(value);
                    } else {
                        acc[key] = value;
                    }
                    return acc;
                }, {} as any);
            }
            return item;
        });
    };

    // Get the first available license URL from distributions
    const getFirstLicenseUrl = () => {
        const firstDistributionWithLicense = dataset.distribution?.find(dist => dist.license?.length > 0);
        const firstLicense = firstDistributionWithLicense?.license?.[0];

        return firstLicense?.uri;
    };

    // Create comprehensive structured data for SEO
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: sanitizeString(printLocaleValue(locale, dataset.title)),
        description: sanitizeString(printLocaleValue(locale, dataset.description)),
        url: `${baseUri}/${locale}/datasets/${dataset.id}/${getDatasetSlug(dataset, locale)}`,
        identifier: dataset.id,
        ...(dataset.publisher?.prefLabel && {
            publisher: {
                '@type': 'Organization',
                name: sanitizeString(printLocaleValue(locale, dataset.publisher.prefLabel)),
                url: dataset.publisher?.uri
            }
        }),
        dateModified: dataset.modified,
        datePublished: dataset.issued,
        keywords: dataset.keyword?.map(k => sanitizeString(printLocaleValue(locale, k))).filter(Boolean).join(', '),
        isAccessibleForFree: dataset.isOpenData,
        ...(getFirstLicenseUrl() && { license: getFirstLicenseUrl() }),
        spatialCoverage: dataset.spatial && dataset.spatial.length > 0 ? sanitizeArray(dataset.spatial.map(spatial => ({
            '@type': 'Place',
            name: sanitizeString(printLocaleValue(locale, spatial.prefLabel))
        }))) : undefined,
        temporalCoverage: dataset.temporal && dataset.temporal.length > 0 ? sanitizeArray(dataset.temporal.map(temporal => ({
            '@type': 'TemporalCoverage',
            startDate: temporal.startDate,
            endDate: temporal.endDate
        }))) : undefined,
        distribution: sanitizeArray(dataset.distribution?.map(dist => ({
            '@type': 'DataDownload',
            ...(dist.fdkFormat?.[0]?.code || dist.fdkFormat?.[0]?.name ? { encodingFormat: dist.fdkFormat?.[0]?.code || dist.fdkFormat?.[0]?.name } : {}),
            contentUrl: dist.accessURL?.[0],
            name: dist.title ? sanitizeString(printLocaleValue(locale, dist.title)) : undefined,
            description: dist.description ? sanitizeString(printLocaleValue(locale, dist.description)) : undefined
        }))),
        // Additional properties for better SEO
        mainEntity: {
            '@type': 'Dataset',
            name: sanitizeString(printLocaleValue(locale, dataset.title)),
            description: sanitizeString(printLocaleValue(locale, dataset.description))
        }
    };

    // Create breadcrumb structured data
    const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${baseUri}/${locale}`
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Datasets',
                item: `${baseUri}/${locale}/datasets`
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: sanitizeString(printLocaleValue(locale, dataset.title)),
                item: `${baseUri}/${locale}/datasets/${dataset.id}/${getDatasetSlug(dataset, locale)}`
            }
        ]
    };

    // Safely stringify with error handling
    const safeStringify = (obj: any): string => {
        try {
            return JSON.stringify(obj, (key, value) => {
                // Remove any undefined values to prevent JSON injection
                if (value === undefined) return undefined;
                return value;
            });
        } catch (error) {
            console.error('Error stringifying structured data:', error);
            return '{}';
        }
    };

    return (
        <>
            <Script
                id="dataset-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: safeStringify(structuredData),
                }}
            />
            <Script
                id="breadcrumb-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: safeStringify(breadcrumbData),
                }}
            />
        </>
    );
} 