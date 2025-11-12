import { getAllCommunityTopics, getOrgLogo, getService } from '@fdk-frontend/data-access/server';
import { getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { getSlug, printLocaleValue } from '@fdk-frontend/utils';
import { type CommunityTopic, type PublicService } from '@fellesdatakatalog/types';
import ServiceDetailsPage from '../../../../components/details-page/service';
import { notFound, redirect } from 'next/navigation';

export type DetailsPageWrapperProps = {
    params: Promise<{
        lang: LocaleCodes;
        id: string;
        slug: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const DetailsPageWrapper = async (props: DetailsPageWrapperProps) => {
    const { id, lang, slug } = await props.params;
    const { tab } = await props.searchParams;
    const dictionaries = {
        common: await getDictionary(lang, 'common'),
        detailsPage: await getDictionary(lang, 'details-page'),
    };
    let service: PublicService;
    let orgLogo: string | null = null;
    let communityTopics: CommunityTopic[] = [];

    try {
        service = await getService(id);
    } catch {
        notFound();
    }

    // Redirect to canonical slug if needed
    const canonicalSlug = getSlug(service, lang);
    if (slug !== canonicalSlug) {
        redirect(`/${lang}/services/${id}/${canonicalSlug}${tab ? `?tab=${tab}` : ''}`);
    }

    if (service.catalog?.publisher?.id) {
        try {
            orgLogo = await getOrgLogo(service.catalog.publisher.id);
        } catch {
            // Fail silently
        }
    }

    try {
        communityTopics = await getAllCommunityTopics(service.id);
    } catch {
        // Fail silently
    }

    return (
        <ServiceDetailsPage
            baseUri={process.env.FDK_BASE_URI as string}
            service={service}
            orgLogo={orgLogo}
            communityTopics={communityTopics}
            communityBaseUri={process.env.FDK_COMMUNITY_BASE_URI as string}
            locale={lang}
            dictionaries={dictionaries}
            defaultActiveTab={tab?.toString() ?? 'overview'}
        />
    );
};

export default DetailsPageWrapper;

export const generateMetadata = async (props: DetailsPageWrapperProps) => {
    const { id, lang } = await props.params;
    const dictionary = await getDictionary(lang, 'details-page');

    try {
        const service = await getService(id);
        const title = printLocaleValue(lang, service.title) || dictionary.header.namelessService;
        const description = printLocaleValue(lang, service.description) ?? dictionary.breadcrumbs.services;
        const publisher = printLocaleValue(lang, service.catalog?.publisher?.prefLabel);
        const keywords = service.keyword
            ?.map((k: any) => printLocaleValue(lang, k))
            .filter(Boolean)
            .join(', ');

        // Create structured data for better SEO
        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: title,
            description: description,
            url: `https://data.norge.no/${lang}/services/${service.id}/${getSlug(service, lang)}`,
            identifier: service.id,
            ...(publisher && {
                publisher: {
                    '@type': 'Organization',
                    name: publisher,
                },
            }),
            dateModified: service.harvest?.modified,
            datePublished: service.harvest?.firstHarvested,
            keywords: keywords,
        };

        return {
            title: `${title} - ${dictionary.breadcrumbs.services} - data.norge.no`,
            description: description,
            keywords: keywords,
            openGraph: {
                title: title,
                description: description,
                type: 'website',
                url: `https://data.norge.no/${lang}/services/${service.id}/${getSlug(service, lang)}`,
                siteName: 'data.norge.no',
                locale: lang,
            },
            twitter: {
                card: 'summary_large_image',
                title: title,
                description: description,
            },
            alternates: {
                canonical: `https://data.norge.no/${lang}/services/${service.id}/${getSlug(service, lang)}`,
                languages: {
                    nb: `https://data.norge.no/nb/services/${service.id}/${getSlug(service, 'nb')}`,
                    en: `https://data.norge.no/en/services/${service.id}/${getSlug(service, 'en')}`,
                    nn: `https://data.norge.no/nn/services/${service.id}/${getSlug(service, 'nn')}`,
                },
            },
            other: {
                'structured-data': JSON.stringify(structuredData),
            },
        };
    } catch (err) {
        console.error(`Failed generate metadata for service with ID ${id}`, JSON.stringify(err));
        notFound();
    }
};
