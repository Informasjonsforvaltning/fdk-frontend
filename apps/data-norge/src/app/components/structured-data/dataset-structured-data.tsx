'use client';

import Script from 'next/script';
import { type LocaleCodes } from '@fdk-frontend/dictionaries';
import { type DatasetWithIdentifier } from '@fellesdatakatalog/types';
import { printLocaleValue, getSlug, safeStringify, sanitizeArray, sanitizeString } from '@fdk-frontend/utils';

export type DatasetStructuredDataProps = {
    dataset: DatasetWithIdentifier;
    locale: LocaleCodes;
    baseUri: string;
};

export default function DatasetStructuredData({ dataset, locale, baseUri }: DatasetStructuredDataProps) {
    // Get the first available license URL from distributions
    const getFirstLicenseUrl = () => {
        const firstDistributionWithLicense = dataset.distribution?.find((dist) => dist.license?.length > 0);
        const firstLicense = firstDistributionWithLicense?.license?.[0];

        return firstLicense?.uri;
    };

    // Create comprehensive structured data for SEO
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Dataset',
        name: sanitizeString(printLocaleValue(locale, dataset.title)),
        description: sanitizeString(printLocaleValue(locale, dataset.description)),
        url: `${baseUri}/${locale}/datasets/${dataset.id}/${getSlug(dataset, locale)}`,
        identifier: dataset.id,
        ...(dataset.publisher?.prefLabel && {
            publisher: {
                '@type': 'Organization',
                name: sanitizeString(printLocaleValue(locale, dataset.publisher.prefLabel)),
                url: dataset.publisher?.uri,
            },
        }),
        dateModified: dataset.modified,
        datePublished: dataset.issued,
        keywords: dataset.keyword
            ?.map((k) => sanitizeString(printLocaleValue(locale, k)))
            .filter(Boolean)
            .join(', '),
        isAccessibleForFree: dataset.isOpenData,
        ...(getFirstLicenseUrl() && { license: getFirstLicenseUrl() }),
        spatialCoverage:
            dataset.spatial && dataset.spatial.length > 0
                ? sanitizeArray(
                      dataset.spatial.map((spatial) => ({
                          '@type': 'Place',
                          name: sanitizeString(printLocaleValue(locale, spatial.prefLabel)),
                      })),
                  )
                : undefined,
        temporalCoverage:
            dataset.temporal && dataset.temporal.length > 0
                ? sanitizeArray(
                      dataset.temporal.map((temporal) => ({
                          '@type': 'TemporalCoverage',
                          startDate: temporal.startDate,
                          endDate: temporal.endDate,
                      })),
                  )
                : undefined,
        distribution: sanitizeArray(
            dataset.distribution?.map((dist) => ({
                '@type': 'DataDownload',
                ...(dist.fdkFormat?.[0]?.code || dist.fdkFormat?.[0]?.name
                    ? { encodingFormat: dist.fdkFormat?.[0]?.code || dist.fdkFormat?.[0]?.name }
                    : {}),
                contentUrl: dist.accessURL?.[0],
                name: dist.title ? sanitizeString(printLocaleValue(locale, dist.title)) : undefined,
                description: dist.description ? sanitizeString(printLocaleValue(locale, dist.description)) : undefined,
            })),
        ),
        // Additional properties for better SEO
        mainEntity: {
            '@type': 'Dataset',
            name: sanitizeString(printLocaleValue(locale, dataset.title)),
            description: sanitizeString(printLocaleValue(locale, dataset.description)),
        },
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
                item: `${baseUri}/${locale}`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Datasets',
                item: `${baseUri}/${locale}/datasets`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: sanitizeString(printLocaleValue(locale, dataset.title)),
                item: `${baseUri}/${locale}/datasets/${dataset.id}/${getSlug(dataset, locale)}`,
            },
        ],
    };

    return (
        <>
            <Script
                id='dataset-structured-data'
                type='application/ld+json'
                dangerouslySetInnerHTML={{
                    __html: safeStringify(structuredData),
                }}
            />
            <Script
                id='breadcrumb-structured-data'
                type='application/ld+json'
                dangerouslySetInnerHTML={{
                    __html: safeStringify(breadcrumbData),
                }}
            />
        </>
    );
}
