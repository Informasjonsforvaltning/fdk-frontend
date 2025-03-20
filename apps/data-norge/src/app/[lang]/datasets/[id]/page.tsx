import { notFound } from 'next/navigation';
import { i18n, getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { printLocaleValue } from '@fdk-frontend/utils';
import {
    type DatasetWithIdentifier,
    type DatasetScores,
    type DatasetScore,
    type DataService,
    type CommunityTopic
} from '@fdk-frontend/fdk-types';
import DatasetDetailsPage from '../../../components/details-page/dataset';
import {
    getOrgLogo,
    getDataset,
    getApis,
    getAllCommunityTopics,
    getRelations,
    getOrgDatasets,
    getThemeDatasets,
    getMetadataScores,
} from '@fdk-frontend/data-access/server';

// Note: Leave these for easier debugging
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
    const { FDK_BASE_URI = '', FDK_COMMUNITY_BASE_URI = '' } = process.env;

    const params = await props.params;
    const searchParams = await props.searchParams;
    const locale = params.lang ?? i18n.defaultLocale;
    const activeTab = searchParams?.tab ?? 'overview';
    const similarItemsLimit = 5;

    const dictionaries = {
        common: await getDictionary(locale, 'common'),
        detailsPage: await getDictionary(locale, 'details-page'),
    };

    let dataset: DatasetWithIdentifier;
    let metadataScore: DatasetScore | null = null;
    let orgLogo: string | null = null;
    let apiRelations: Partial<DataService>[] = [];
    let apis: DataService[] = [];
    let relatedDatasets: DatasetWithIdentifier[] = [];
    let similarDatasets: DatasetWithIdentifier[] = [];
    let orgDatasets: DatasetWithIdentifier[] = [];
    let themeDatasets: DatasetWithIdentifier[] = [];
    let communityTopics: CommunityTopic[] = [];

    // Fetch details about dataset

    try {
        dataset = await getDataset(params.id);
    } catch (err) {
        console.log(err);
        notFound();
        throw err;
    }

    // Fetch publisher logo

    try {
        orgLogo = await getOrgLogo(dataset.publisher?.id);
    } catch (err) {
        console.log(err);
    }

    // Fetch metadata scores

    try {
        metadataScore = (await getMetadataScores([dataset.uri]) as DatasetScores)?.scores?.[dataset.uri];
    } catch (err) {
        console.log(err);
    }

    // Fetch community posts

    try {
        communityTopics = await getAllCommunityTopics(dataset.id);
    } catch (err) {
        console.log(err);
    }

    // Fetch related resources

    try {
        const results = await getRelations(dataset.identifier?.[0]);

        const hits = results?.hits ?? [];

        apiRelations = hits.filter((r: any) => r.searchType === 'DATA_SERVICE');
        relatedDatasets = hits.filter((r: any) => r.searchType === 'DATASET');

        apis = await getApis(apiRelations.map(api => api.id).filter((id): id is string => id !== undefined));
    } catch (err) {
        console.error(err);
    }

    // If room for more, fetch additional datasets from themes

    try {
        const results = await getThemeDatasets(dataset.losTheme?.map((t: any) => t.losPaths[0]));

        // Filter self
        themeDatasets = results.hits?.filter((d: any) => d.id !== dataset.id) || [];

        // Combine and limit to 5
        similarDatasets = [...relatedDatasets, ...themeDatasets].slice(0, similarItemsLimit);
    } catch (err) {
        console.log(err);
    }

    // If room for more, fetch additional datasets based on org

    if (similarDatasets && similarDatasets?.length < similarItemsLimit) {
        try {
            const results = await getOrgDatasets(dataset.publisher?.orgPath);

            // Filter self
            orgDatasets = results.hits?.filter((d: any) => d.id !== dataset.id) || [];

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
            apis={apis}
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
