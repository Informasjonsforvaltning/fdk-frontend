import Script from 'next/script';
import { type LocaleCodes } from '@fdk-frontend/dictionaries';
import { type PublicService } from '@fellesdatakatalog/types';
import { printLocaleValue, getDatasetSlug } from '@fdk-frontend/utils';
import { safeStringify, sanitizeArray, sanitizeString } from 'apps/data-norge/src/utils/structured-data';

export type ServiceStructuredDataProps = {
    service: PublicService;
    locale: LocaleCodes;
    baseUri: string;
};

export default function ServiceStructuredData({ service, locale, baseUri }: ServiceStructuredDataProps) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: sanitizeString(printLocaleValue(locale, service.title)),
        description: sanitizeString(printLocaleValue(locale, service.description)),
        url: `${baseUri}/${locale}/services/${service.id}/${getDatasetSlug(service, locale)}`,
        identifier: service.id,
        ...(service.catalog?.publisher?.prefLabel && {
            publisher: {
                '@type': 'Organization',
                name: sanitizeString(printLocaleValue(locale, service.catalog.publisher.prefLabel)),
                url: service.catalog.publisher?.uri,
            },
        }),
        dateModified: service.harvest?.modified,
        datePublished: service.harvest?.firstHarvested,
        keywords: service.keyword
            ?.map((k) => sanitizeString(printLocaleValue(locale, k)))
            .filter(Boolean)
            .join(', '),
        spatialCoverage:
            service.spatial && service.spatial.length > 0
                ? sanitizeArray(
                      service.spatial.map((spatial) => ({
                          '@type': 'Place',
                          name: sanitizeString(spatial),
                      })),
                  )
                : undefined,
        mainEntity: {
            '@type': 'Service',
            name: sanitizeString(printLocaleValue(locale, service.title)),
            description: sanitizeString(printLocaleValue(locale, service.description)),
        },
    };

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
                name: 'Services',
                item: `${baseUri}/${locale}/services`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: sanitizeString(printLocaleValue(locale, service.title)),
                item: `${baseUri}/${locale}/services/${service.id}/${getDatasetSlug(service, locale)}`,
            },
        ],
    };

    return (
        <>
            <Script
                id='service-structured-data'
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
