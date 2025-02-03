import { notFound } from 'next/navigation'
import { i18n, getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { printLocaleValue } from '@fdk-frontend/utils';

import DetailsPage from '../../../components/details/details-page/dataset';
import { fetchResource, fetchRelations, fetchOrgDatasets, fetchThemeDatasets } from '../data';

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
        FDK_SEARCH_SERVICE_BASE_URI
    } = process.env;

    const params = await props.params;
    const searchParams = await props.searchParams;
    const locale = params.lang ?? i18n.defaultLocale;
    const commonDictionary = await getDictionary(locale, 'common');
    const activeTab = searchParams?.tab ?? 'overview';
    const relatedItemsLimit = 5;

    let dataset;
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

    // Fetch related

    try {
        const relations = await fetchRelations(`${FDK_SEARCH_SERVICE_BASE_URI}/search`, dataset.identifier[0]);
        if (!relations.hits) throw new Error();

        // APIs

        apiRelations = relations.hits.filter(r => r.searchType === 'DATA_SERVICE');
        relatedDatasets = relations.hits.filter(r => r.searchType === 'DATASET');

        // Fetch additional details for each related API

        const detailedApiResponses = await Promise.all(
            apiRelations?.map(async (api: any) => {
                return await fetchResource(`${FDK_RESOURCE_SERVICE_BASE_URI}/data-services/${api.id}`);
            })
        );
        // Filter out failed requests (null values)

        detailedApis = detailedApiResponses.filter(api => api !== null);

    } catch (err) {
        console.log(err);
    }

    // If room for more, fetch additional datasets from themes

    if (relatedDatasets.length < relatedItemsLimit) {
        try {
            themeDatasets = await fetchThemeDatasets(`${FDK_SEARCH_SERVICE_BASE_URI}/search/datasets`, dataset?.losTheme?.map(t => t.losPaths[0]));

            // Filter self
            themeDatasets = themeDatasets.hits.filter(d => d.id !== dataset.id);

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
            orgDatasets = orgDatasets.hits.filter(d => d.id !== dataset.id);

            // Combine and limit to 5
            relatedDatasets = [ ...relatedDatasets, ...orgDatasets ].slice(0, relatedItemsLimit);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <DetailsPage
                variant='dataset'
                resource={dataset}
                apis={detailedApis}
                relatedDatasets={relatedDatasets}
                locale={locale}
                commonDictionary={commonDictionary}
                defaultActiveTab={activeTab}
            />
        </>
    );
};

export const generateMetadata = async (props: DetailsPageWrapperProps) => {

    const params = await props.params;
    const locale = params.lang ?? i18n.defaultLocale;
    const { FDK_RESOURCE_SERVICE_BASE_URI } = process.env;

    try {
        const dataset = await fetchResource(`${FDK_RESOURCE_SERVICE_BASE_URI}/datasets/${params.id}`);
        return {
            title: `${printLocaleValue(locale, dataset.title)} - Datasett - data.norge.no`,
            description: dataset.description ?? 'POC for detaljvisning'
        };
    } catch (err) {
        console.error(err);
        notFound();
    }
};

export default DetailsPageWrapper;
