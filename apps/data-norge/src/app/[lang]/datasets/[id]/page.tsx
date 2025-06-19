import { notFound } from 'next/navigation';
import { i18n, getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { printLocaleValue } from '@fdk-frontend/utils';
import { type PopulatedDatasetReference } from '@fdk-frontend/types';
import {
    type DatasetWithIdentifier,
    type DatasetScores,
    type DatasetScore,
    type DataService,
    type CommunityTopic,
    type SearchObject,
} from '@fdk-frontend/fdk-types';
import DatasetDetailsPage from '../../../components/details-page/dataset';
import {
    getOrgLogo,
    getDataset,
    getApis,
    getAllCommunityTopics,
    getMetadataScores,
    searchRelations,
    searchOrgDatasets,
    searchThemeDatasets,
    searchConcepts,
    getPopulatedDatasetReferences,
    searchDatasets,
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
    const { FDK_BASE_URI, FDK_COMMUNITY_BASE_URI } = process.env;

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
    let metadataScore: DatasetScore | undefined = undefined;
    let orgLogo: string | null = null;
    let apis: DataService[] = [];
    let concepts: SearchObject[] = [];
    let externalRelatedAPIs: SearchObject[] = [];
    let externalRelatedDatasets: DatasetWithIdentifier[] = [];
    let internalRelatedDatasets: DatasetWithIdentifier[] = [];
    let similarDatasets: DatasetWithIdentifier[] = [];
    let orgDatasets: DatasetWithIdentifier[] = [];
    let themeDatasets: DatasetWithIdentifier[] = [];
    let communityTopics: CommunityTopic[] = [];
    let populatedReferences: PopulatedDatasetReference[] = [];

    // Fetch details about dataset

    try {
        dataset = await getDataset(params.id);
        // dataset = mockResource;
    } catch (err) {
        console.error(`Failed to get dataset with ID ${params.id}`, JSON.stringify(err));
        notFound();
        throw err;
    }

    // Fetch publisher logo

    try {
        orgLogo = await getOrgLogo(dataset.publisher?.id);
    } catch {
        // Do nothing
    }

    // Fetch metadata scores

    try {
        metadataScore = ((await getMetadataScores([dataset.uri])) as DatasetScores)?.scores?.[dataset.uri];
    } catch {
        // Do nothing
    }

    // Fetch community posts

    try {
        communityTopics = await getAllCommunityTopics(dataset.id);
    } catch {
        // Do nothing
    }

    // Lookup concepts/subjects

    try {
        const results = await searchConcepts(
            dataset.subject?.map((concept) => concept.uri).filter((uri) => uri !== undefined),
        );
        concepts = results?.hits ?? [];
    } catch {
        // Do nothing
    }

    // Find internal related datasets

    try {
        const results = await searchDatasets(
            dataset.references?.map((r) => r.source?.uri).filter((uri) => uri !== undefined),
        );
        internalRelatedDatasets = results?.hits ?? [];
    } catch {
        // Do nothing
    }

    // Lookup references

    try {
        populatedReferences = await getPopulatedDatasetReferences(dataset.references);
    } catch {
        // Do nothing
    }

    // Find external related resources

    try {
        const results = await searchRelations(dataset.identifier?.[0]);
        const hits = results?.hits ?? [];

        externalRelatedAPIs = hits.filter((r: SearchObject) => r.searchType === 'DATA_SERVICE');
        externalRelatedDatasets = hits.filter((r: SearchObject) => r.searchType === 'DATASET');

        apis = await getApis(externalRelatedAPIs.map((api) => api.id).filter((id): id is string => id !== undefined));
    } catch {
        // Do nothing
    }

    // If room for more, fetch additional datasets from themes

    try {
        const results = await searchThemeDatasets(dataset.losTheme?.map((t: any) => t.losPaths[0]));

        // Filter self
        themeDatasets = results.hits?.filter((d: any) => d.id !== dataset.id) || [];

        // Combine and limit to 5
        similarDatasets = [...externalRelatedDatasets, ...themeDatasets].slice(0, similarItemsLimit);
    } catch {
        // Do nothing
    }

    // If room for more, fetch additional datasets based on org

    if (similarDatasets && similarDatasets?.length < similarItemsLimit) {
        try {
            const results = await searchOrgDatasets(dataset.publisher?.orgPath);

            // Filter self
            orgDatasets = results.hits?.filter((d: any) => d.id !== dataset.id && d.searchType === 'DATASET') || [];

            // Combine and limit to 5
            similarDatasets = [...similarDatasets, ...orgDatasets].slice(0, similarItemsLimit);
        } catch {
            // Do nothing
        }
    }

    return (
        <DatasetDetailsPage
            baseUri={FDK_BASE_URI as string}
            resource={dataset}
            orgLogo={orgLogo}
            apis={apis}
            concepts={concepts}
            metadataScore={metadataScore}
            similarDatasets={similarDatasets}
            populatedReferences={populatedReferences}
            internalRelatedDatasets={internalRelatedDatasets}
            communityTopics={communityTopics}
            communityBaseUri={FDK_COMMUNITY_BASE_URI as string}
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
            description: printLocaleValue(locale, dataset.description) ?? dictionary.breadcrumbs.datasets,
        };
    } catch (err) {
        console.error(`Failed generate metadata for dataset with ID ${params.id}`, JSON.stringify(err));
        notFound();
    }
};

export default DetailsPageWrapper;
