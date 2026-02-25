import { getAllCommunityTopics, getOrgLogo, getService, searchConcepts } from '@fdk-frontend/data-access/server';
import { getLocalization, type LocaleCodes } from '@fdk-frontend/localization';
import { getSlug, printLocaleValue } from '@fdk-frontend/utils';
import { SearchObject, type CommunityTopic, type PublicService } from '@fellesdatakatalog/types';
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
    const loc = getLocalization(lang);
    const dictionaries = {
        common: loc.common,
        detailsPage: loc.detailsPage,
    };
    let service: PublicService;
    let orgLogo: string | null = null;
    let communityTopics: CommunityTopic[] = [];
    let concepts: SearchObject[] = [];

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

    // Find publisher: one of competent authority, owner, or catalog publisher
    const publisher =
        service.hasCompetentAuthority?.find((org) => org.id || org.identifier) ||
        service.ownedBy?.find((org) => org.id || org.identifier) ||
        service.catalog?.publisher;

    if (publisher?.id || publisher?.identifier) {
        try {
            orgLogo = await getOrgLogo(publisher?.id || publisher?.identifier);
        } catch {
            // Fail silently
        }
    }

    try {
        const results = await searchConcepts(
            service.subject?.map((concept) => concept.uri).filter((uri) => uri !== undefined),
        );
        concepts = results?.hits ?? [];
    } catch {
        // Fail silently
    }

    try {
        communityTopics = await getAllCommunityTopics(service.id);
    } catch {
        // Fail silently
    }

    return (
        <ServiceDetailsPage
            baseUri={process.env.FDK_BASE_URI as string}
            concepts={concepts}
            service={service}
            orgLogo={orgLogo}
            communityTopics={communityTopics}
            communityBaseUri={process.env.FDK_COMMUNITY_BASE_URI as string}
            locale={lang}
            dictionaries={dictionaries}
            defaultActiveTab={tab?.toString() || 'overview'}
            publisher={publisher}
        />
    );
};

export default DetailsPageWrapper;

export const generateMetadata = async (props: DetailsPageWrapperProps) => {
    const { id, lang } = await props.params;
    const dictionary = getLocalization(lang).detailsPage;

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
