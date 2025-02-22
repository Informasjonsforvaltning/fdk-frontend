import { notFound } from 'next/navigation';
import { i18n, getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { printLocaleValue } from '@fdk-frontend/utils';
import DatasetDetailsPage from '../../../components/details-page/dataset';
import {
    getOrgLogo,
    getDataset,
    getApi,
    getCommunityPosts,
    getCommunityTopic,
    getRelations,
    getOrgDatasets,
    getThemeDatasets,
    getMetadataScores
} from '@fdk-frontend/data-access/server';

// import mockResource from '../mock/resource-service/sort-test-datasett.json';
// import mockResource from '../mock/resource-service/lovhjemler.json';
// import mockSearch from '../mock/search-service/search.json';

export type DetailsPageWrapperProps = {
    params: Promise<{
        lang: LocaleCodes;
        id: string;
    }>;
    searchParams: Promise<any>;
};

const DetailsPageWrapper = async (props: DetailsPageWrapperProps) => {
    const {
        FDK_BASE_URI = '',
        FDK_COMMUNITY_BASE_URI = '',
    } = process.env;

    const params = await props.params;
    const searchParams = await props.searchParams;
    const locale = params.lang ?? i18n.defaultLocale;
    const activeTab = searchParams?.tab ?? 'overview';
    const similarItemsLimit = 5;

    const dictionaries = {
        common: await getDictionary(locale, 'common'),
        detailsPage: await getDictionary(locale, 'details-page'),
    };

    let dataset;
    let metadataScore;
    let orgLogo;
    let apiRelations;
    let detailedApis;
    let relatedDatasets;
    let similarDatasets;
    let orgDatasets;
    let themeDatasets;
    let communityTopics;

    // Fetch details about dataset

    try {
        dataset = await getDataset(params.id);
    } catch (err) {
        console.log(err);
        notFound();
    }

    // Fetch publisher logo

    try {
        orgLogo = await getOrgLogo(dataset.publisher?.id);
    } catch (err) {
        console.log(err);
    }

    // Fetch metadata scores

    try {
        metadataScore = await getMetadataScores([dataset.uri]);
        metadataScore = metadataScore?.scores[dataset.uri];
    } catch (err) {
        console.log(err);
    }

    // Fetch community posts

    try {
        const communitySearchParams = new URLSearchParams();

        communitySearchParams.set('term', dataset.id);
        communitySearchParams.set('sortBy', 'topic.lastposttime');
        communitySearchParams.set('sortDirection', 'desc');

        const communitySearch = await getCommunityPosts(communitySearchParams.toString());

        const uniqueTopics = new Set<string>();
        communitySearch.posts.forEach((post: any) => uniqueTopics.add(post.topic.tid));

        communityTopics = await Promise.all(
            Array.from(uniqueTopics).map(async (topicId: string) => {
                return await getCommunityTopic(topicId);
            }),
        );
    } catch (err) {
        console.log(err);
    }

    // Fetch related resources

    try {
        const relations = await getRelations(dataset.identifier[0]);

        apiRelations = relations.hits?.filter((r: any) => r.searchType === 'DATA_SERVICE') || [];
        relatedDatasets = relations.hits?.filter((r: any) => r.searchType === 'DATASET') || [];

        // Fetch additional details for each related API

        const detailedApiResponses = await Promise.all(
            apiRelations?.map(async (api: any) => {
                return await getApi(api.id);
            }),
        );

        // Filter out failed requests (null values)

        detailedApis = detailedApiResponses?.filter((api: any) => api !== null) || [];
    } catch (err) {
        console.log(err);
    }

    // If room for more, fetch additional datasets from themes

    try {
        themeDatasets = await getThemeDatasets(dataset?.losTheme?.map((t: any) => t.losPaths[0]),);

        // Filter self
        themeDatasets = themeDatasets.hits?.filter((d: any) => d.id !== dataset.id) || [];

        // Combine and limit to 5
        similarDatasets = [...relatedDatasets, ...themeDatasets].slice(0, similarItemsLimit);
    } catch (err) {
        console.log(err);
    }

    // If room for more, fetch additional datasets based on org

    if (similarDatasets && similarDatasets?.length < similarItemsLimit) {
        try {
            orgDatasets = await getOrgDatasets(dataset.publisher?.orgPath);

            // Filter self
            orgDatasets = orgDatasets.hits.filter((d: any) => d.id !== dataset.id) || [];

            // Combine and limit to 5
            similarDatasets = [...similarDatasets, ...orgDatasets].slice(0, similarItemsLimit);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <DatasetDetailsPage
            baseUri={FDK_BASE_URI}
            resource={dataset}
            orgLogo={orgLogo}
            apis={detailedApis}
            metadataScore={metadataScore}
            similarDatasets={similarDatasets}
            relatedDatasets={relatedDatasets}
            communityTopics={communityTopics}
            communityBaseUri={FDK_COMMUNITY_BASE_URI}
            locale={locale}
            dictionaries={dictionaries}
            defaultActiveTab={activeTab}
        />
    );
};

export const generateMetadata = async (props: DetailsPageWrapperProps) => {
    const params = await props.params;
    const locale = params.lang ?? i18n.defaultLocale;
    const dictionary = await getDictionary(locale, 'details-page');

    try {
        const dataset = await getDataset(params.id);
        const title = printLocaleValue(locale, dataset.title) || dictionary.header.namelessDataset;
        return {
            title: `${title} - ${dictionary.breadcrumbs.datasets} - data.norge.no`,
            description: dataset.description ?? dictionary.breadcrumbs.datasets,
        };
    } catch (err) {
        console.log(err);
        notFound();
    }
};

export default DetailsPageWrapper;
