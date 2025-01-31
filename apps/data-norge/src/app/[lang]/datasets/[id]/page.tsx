import { notFound } from 'next/navigation'
import { i18n, getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { printLocaleValue } from '@fdk-frontend/utils';

import DetailsPage from '../../../components/details/details-page/dataset';

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

    let dataset; //, relatedResources, relatedApis;
    let relatedApis;
    let detailedApis;

    // Fetch details about dataset

    try {
        const response = await fetch(`${FDK_RESOURCE_SERVICE_BASE_URI}/datasets/${params.id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Bad response');
        dataset = await response.json();
    } catch (err) {
        console.error(err);
        notFound();
    }

    // Fetch related APIs

    try {
        const response = await fetch(`${FDK_SEARCH_SERVICE_BASE_URI}/search`, {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pagination: { size: 100 },
                filters: {
                    relations: {
                        value: dataset.identifier[0]
                    }
                }
            })
        });
        
        if (!response.ok) {
            throw new Error(`Bad response: ${response.status}`);
        }

        relatedApis = await response.json();

        // Fetch additional details for each related API

        const detailedApiResponses = await Promise.all(
            relatedApis?.hits.map(async (api: any) => {
                const apiResponse = await fetch(`${FDK_RESOURCE_SERVICE_BASE_URI}/data-services/${api.id}`, {
                    cache: 'force-cache'
                });
                if (!apiResponse.ok) {
                    console.error(`Failed to fetch details for API ${api.id}`);
                    return null;
                }
                return await apiResponse.json();
            })
        );

        // Filter out failed requests (null values)

        detailedApis = detailedApiResponses.filter(api => api !== null);

    } catch (err) {
        console.error(err);
    }

    const activeTab = searchParams?.tab ?? 'overview';

    return (
        <>
            <DetailsPage
                variant='dataset'
                resource={dataset}
                // resource={mockResource}
                apis={detailedApis}
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
        const response = await fetch(`${FDK_RESOURCE_SERVICE_BASE_URI}/datasets/${params.id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Bad response');
        const dataset = await response.json();

        return {
            title: `${printLocaleValue(locale, dataset.title)} - Datasett - data.norge.no`,
            description: dataset.description ?? 'POC for detaljvisning'
        };
    } catch (err) {
        console.error(err);
        return {
            title: 'Datasett ikke funnet - data.norge.no',
            description: 'Datasettet kunne ikke hentes.'
        };
    }
};
export default DetailsPageWrapper;
