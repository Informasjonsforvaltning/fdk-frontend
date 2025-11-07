import { getAllCommunityTopics, getOrgLogo, getService } from '@fdk-frontend/data-access/server';
import { getDictionary, i18n, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { getDatasetSlug } from '@fdk-frontend/utils';
import { type CommunityTopic, type PublicService } from '@fellesdatakatalog/types';
import ServiceDetailsPage from 'apps/data-norge/src/app/components/details-page/service';
import { notFound, redirect } from 'next/navigation';

export type DetailsPageWrapperProps = {
    params: Promise<{
        lang: LocaleCodes;
        id: string;
        slug: string;
    }>;
    searchParams: Promise<any>;
};

const DetailsPageWrapper = async (props: DetailsPageWrapperProps) => {
    const { FDK_BASE_URI, FDK_COMMUNITY_BASE_URI } = process.env;

    const params = await props.params;
    const searchParams = await props.searchParams;
    const locale = params.lang ?? i18n.defaultLocale;
    const activeTab = searchParams?.tab ?? 'overview';

    const dictionaries = {
        common: await getDictionary(locale, 'common'),
        detailsPage: await getDictionary(locale, 'details-page'),
    };

    let service: PublicService;
    let orgLogo: string | null = null;
    let communityTopics: CommunityTopic[] = [];

    try {
        service = await getService(params.id);
    } catch (err) {
        console.error(`Failed to get service with ID ${params.id}`, JSON.stringify(err));
        notFound();
    }

    // Redirect to canonical slug if needed
    const canonicalSlug = getDatasetSlug(service, locale); // todo: getServiceSlug
    if (params.slug !== canonicalSlug) {
        // Preserve query parameters
        const queryString = new URLSearchParams(searchParams as Record<string, string>).toString();
        const redirectUrl = queryString
            ? `/${locale}/services/${params.id}/${canonicalSlug}?${queryString}`
            : `/${locale}/services/${params.id}/${canonicalSlug}`;

        redirect(redirectUrl);
    }

    // Fetch publisher logo
    try {
        orgLogo = await getOrgLogo((service as any)?.catalog.publisher.id);
        console.log(orgLogo);
    } catch {
        // Do nothing
    }

    // Fetch community posts
    try {
        communityTopics = await getAllCommunityTopics(service.id);
    } catch {
        // Do nothing
    }

    console.log(service);

    return (
        <ServiceDetailsPage
            baseUri={FDK_BASE_URI as string}
            resource={service}
            orgLogo={orgLogo}
            // apis={apis}
            // concepts={concepts}
            // metadataScore={metadataScore}
            // similarDatasets={similarDatasets}
            // populatedReferences={populatedReferences}
            // internalRelatedDatasets={internalRelatedDatasets}
            communityTopics={communityTopics}
            communityBaseUri={FDK_COMMUNITY_BASE_URI as string}
            locale={locale}
            dictionaries={dictionaries}
            defaultActiveTab={activeTab}
            // resolvedDistributionDataServices={resolvedDistributionDataServices}
            // resolvedDistributionInformationModels={resolvedDistributionInformationModels}
        />
    );
};

export default DetailsPageWrapper;
