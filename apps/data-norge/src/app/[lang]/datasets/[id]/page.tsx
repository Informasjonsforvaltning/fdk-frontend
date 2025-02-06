import { notFound } from 'next/navigation'
import { i18n, getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { printLocaleValue } from '@fdk-frontend/utils';

import DetailsPage from '../../../components/details/details-page/dataset';
import { fetchResource, fetchRelations, fetchOrgDatasets, fetchThemeDatasets, fetchMetadataScores, fetchOrglogo } from '../data';

// import mockResource from '../mock/resource-api/sort-test-datasett.json';
// import mockResource from '../mock/resource-api/lovhjemler.json';
// import mockSearch from '../mock/search/search.json';

export type DetailsPageWrapperProps = {
    params: Promise<{
        lang: LocaleCodes;
        id: string[];
    }>;
    searchParams: Promise<any>;
};

const DetailsPageWrapper = async (props: DetailsPageWrapperProps) => {

    const {
        FDK_RESOURCE_SERVICE_BASE_URI,
        FDK_SEARCH_SERVICE_BASE_URI,
        FDK_MQA_API_BASE_URI,
        DIGDIR_ORGLOGO_API_BASE_URI,
    } = process.env;

    const params = await props.params;
    const searchParams = await props.searchParams;
    const locale = params.lang ?? i18n.defaultLocale;
    const commonDictionary = await getDictionary(locale, 'common');
    const activeTab = searchParams?.tab ?? 'overview';
    const relatedItemsLimit = 5;

    let dataset;
    let metadataScore;
    let orgLogo;
    let apiRelations = [];
    let detailedApis = [];
    let relatedDatasets = [];
    let orgDatasets = [];
    let themeDatasets = [];

    // Fetch details about dataset

    try {
        dataset = await fetchResource(`${FDK_RESOURCE_SERVICE_BASE_URI}/datasets/${params.id}`);
    } catch (err) {
        console.log(err);
        notFound();
    }

    // Fetch publisher logos

    try {
        orgLogo = await fetchOrglogo(`${DIGDIR_ORGLOGO_API_BASE_URI}/api/emblem/svg/${dataset.publisher?.id}`);
    } catch (err) {
        console.log(err);
    }

    if (!orgLogo) {
        try {
            orgLogo = await fetchOrglogo(`${DIGDIR_ORGLOGO_API_BASE_URI}/api/logo/svg/${dataset.publisher?.id}`);
        } catch (err) {
            console.log(err);
        }
    }

    if (!orgLogo) {
        try {
            orgLogo = await fetchOrglogo(`${DIGDIR_ORGLOGO_API_BASE_URI}/api/logo/org/${dataset.publisher?.id}`);
        } catch (err) {
            console.log(err);
        }
    }

    // Fetch metadata scores

    try {
        metadataScore = await fetchMetadataScores(`${FDK_MQA_API_BASE_URI}/api/scores`, [dataset.uri]);
        // console.log(`${FDK_MQA_API_BASE_URI}/api/scores`, dataset.identifier[0]);
        // console.log(metadataScore.scores[dataset.uri]);
        metadataScore = metadataScore.scores[dataset.uri];
    } catch (err) {
        console.log(err);
    }

    // Fetch related

    try {
        const relations = await fetchRelations(`${FDK_SEARCH_SERVICE_BASE_URI}/search`, dataset.identifier[0]);
        if (!relations.hits) throw new Error();

        // APIs

        apiRelations = relations.hits.filter((r: any) => r.searchType === 'DATA_SERVICE');
        relatedDatasets = relations.hits.filter((r: any) => r.searchType === 'DATASET');

        // Fetch additional details for each related API

        const detailedApiResponses = await Promise.all(
            apiRelations?.map(async (api: any) => {
                return await fetchResource(`${FDK_RESOURCE_SERVICE_BASE_URI}/data-services/${api.id}`);
            })
        );
        // Filter out failed requests (null values)

        detailedApis = detailedApiResponses.filter((api: any) => api !== null);

    } catch (err) {
        console.log(err);
    }

    // If room for more, fetch additional datasets from themes

    if (relatedDatasets.length < relatedItemsLimit) {
        try {
            themeDatasets = await fetchThemeDatasets(`${FDK_SEARCH_SERVICE_BASE_URI}/search/datasets`, dataset?.losTheme?.map((t: any) => t.losPaths[0]));

            // Filter self
            themeDatasets = themeDatasets.hits.filter((d: any) => d.id !== dataset.id);

            // Combine and limit to 5
            relatedDatasets = [ ...relatedDatasets, ...themeDatasets ].slice(0, relatedItemsLimit);
        } catch (err) {
            console.log(err);
        }
    }

    // If room for more, fetch additional datasets based on org

    if (relatedDatasets.length < relatedItemsLimit) {
        try {
            orgDatasets = await fetchOrgDatasets(`${FDK_SEARCH_SERVICE_BASE_URI}/search/datasets`, dataset.publisher?.orgPath);
            
            // Filter self
            orgDatasets = orgDatasets.hits.filter((d: any) => d.id !== dataset.id);

            // Combine and limit to 5
            relatedDatasets = [ ...relatedDatasets, ...orgDatasets ].slice(0, relatedItemsLimit);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <DetailsPage
            variant='dataset'
            resource={dataset}
            orgLogo={orgLogo}
            apis={detailedApis}
            metadataScore={metadataScore}
            relatedDatasets={relatedDatasets}
            locale={locale}
            commonDictionary={commonDictionary}
            defaultActiveTab={activeTab}
        />
    );
};

export const generateMetadata = async (props: DetailsPageWrapperProps) => {

    const params = await props.params;
    const locale = params.lang ?? i18n.defaultLocale;
    const { FDK_RESOURCE_SERVICE_BASE_URI } = process.env;

    try {
        const dataset = await fetchResource(`${FDK_RESOURCE_SERVICE_BASE_URI}/datasets/${params.id}`);
        return {
            title: `${printLocaleValue(locale, dataset.title) || 'Navnløst datasett'} - Datasett - data.norge.no`,
            description: dataset.description ?? 'POC for detaljvisning'
        };
    } catch (err) {
        console.log(err);
        notFound();
    }
};

export default DetailsPageWrapper;
