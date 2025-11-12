import { getAllCommunityTopics, getOrgLogo, getService } from '@fdk-frontend/data-access/server';
import { getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { getDatasetSlug } from '@fdk-frontend/utils';
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
    const canonicalSlug = getDatasetSlug(service, lang);
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
