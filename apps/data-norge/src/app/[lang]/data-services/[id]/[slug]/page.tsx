import { notFound, redirect } from 'next/navigation';
import { i18n, getLocalization, type LocaleCodes } from '@fdk-frontend/localization';
import { getSlug, printLocaleValue } from '@fdk-frontend/utils';
import { type DataService, type CommunityTopic, type SearchObject } from '@fellesdatakatalog/types';
import DataServiceDetailsPage from '../../../../components/details-page/data-service';
import { getOrgLogo, getApi, getAllCommunityTopics, searchDatasets } from '@fdk-frontend/data-access/server';

export type DetailsPageWrapperProps = {
    params: Promise<{
        lang: LocaleCodes;
        id: string;
        slug: string;
    }>;
    searchParams: Promise<any>;
};

export const generateMetadata = async (props: DetailsPageWrapperProps) => {
    const params = await props.params;
    const locale = params.lang ?? i18n.defaultLocale;
    const dictionary = getLocalization(locale).detailsPage;

    try {
        const dataService = await getApi(params.id);
        const title = printLocaleValue(locale, dataService.title) || dictionary.header.namelessDataService;
        const description = printLocaleValue(locale, dataService.description) ?? dictionary.breadcrumbs.dataServices;

        return {
            title: `${title} - ${dictionary.breadcrumbs.dataServices} - data.norge.no`,
            description: description,
            openGraph: {
                title: title,
                description: description,
                type: 'website',
                url: `https://data.norge.no/${locale}/data-services/${dataService.id}/${getSlug(dataService, locale)}`,
                siteName: 'data.norge.no',
                locale: locale,
            },
            twitter: {
                card: 'summary_large_image',
                title: title,
                description: description,
            },
            alternates: {
                canonical: `https://data.norge.no/${locale}/data-services/${dataService.id}/${getSlug(dataService, locale)}`,
                languages: {
                    nb: `https://data.norge.no/nb/data-services/${dataService.id}/${getSlug(dataService, 'nb')}`,
                    en: `https://data.norge.no/en/data-services/${dataService.id}/${getSlug(dataService, 'en')}`,
                    nn: `https://data.norge.no/nn/data-services/${dataService.id}/${getSlug(dataService, 'nn')}`,
                },
            },
        };
    } catch (err) {
        console.error(`Failed generate metadata for data service with ID ${params.id}`, JSON.stringify(err));
        notFound();
    }
};

const DetailsPageWrapper = async (props: DetailsPageWrapperProps) => {
    const { FDK_BASE_URI, FDK_COMMUNITY_BASE_URI } = process.env;

    const params = await props.params;
    const searchParams = await props.searchParams;
    const locale = params.lang ?? i18n.defaultLocale;
    const activeTab = searchParams?.tab ?? 'overview';

    const loc = getLocalization(locale);
    const dictionaries = {
        common: loc.common,
        detailsPage: loc.detailsPage,
    };

    let dataService: DataService;
    let orgLogo: string | null = null;
    let communityTopics: CommunityTopic[] = [];
    let resolvedDatasets: SearchObject[] = [];

    try {
        dataService = await getApi(params.id);
    } catch (err) {
        console.error(`Failed to get data service with ID ${params.id}`, JSON.stringify(err));
        notFound();
    }

    // Redirect to canonical slug if needed
    const canonicalSlug = getSlug(dataService, locale);
    if (params.slug !== canonicalSlug) {
        const queryString = new URLSearchParams(searchParams as Record<string, string>).toString();
        const redirectUrl = queryString
            ? `/${locale}/data-services/${params.id}/${canonicalSlug}?${queryString}`
            : `/${locale}/data-services/${params.id}/${canonicalSlug}`;

        redirect(redirectUrl);
    }

    // Fetch non-critical supplementary data in parallel (graceful degradation on failure)
    [orgLogo, communityTopics, resolvedDatasets] = await Promise.all([
        getOrgLogo(dataService.publisher?.id).catch(() => null),
        getAllCommunityTopics(dataService.id).catch((): CommunityTopic[] => []),
        searchDatasets(dataService.servesDataset)
            .then(({ hits = [] }) => hits)
            .catch((): SearchObject[] => []),
    ]);

    return (
        <DataServiceDetailsPage
            baseUri={FDK_BASE_URI as string}
            resource={dataService}
            orgLogo={orgLogo}
            communityTopics={communityTopics}
            communityBaseUri={FDK_COMMUNITY_BASE_URI as string}
            locale={locale}
            dictionaries={dictionaries}
            defaultActiveTab={activeTab}
            resolvedDatasets={resolvedDatasets}
        />
    );
};

export default DetailsPageWrapper;
