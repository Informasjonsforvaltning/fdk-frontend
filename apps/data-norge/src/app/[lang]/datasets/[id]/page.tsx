import { notFound } from 'next/navigation'
import { i18n, getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';

import DetailsPage from '../../../components/details/details-page';

import mockResource from '../mock/resource-api/sort-test-datasett.json';
import mockSearch from '../mock/search/search.json';

export type DetailsPageWrapperProps = {
    params: Promise<{
        lang: LocaleCodes;
        id: string[];
    }>;
};

const DetailsPageWrapper = async (props: DetailsPageWrapperProps) => {

    const { FDK_RESOURCE_SERVICE_BASE_URI } = process.env;
    
    const params = await props.params;
    const locale = params.lang ?? i18n.defaultLocale;

    const commonDictionary = await getDictionary(locale, 'common');

    let json;

    try {
        const response = await fetch(`${FDK_RESOURCE_SERVICE_BASE_URI}/datasets/${params.id}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) throw new Error('Bad response');
        json = await response.json();
    } catch (err) {
        notFound();
    }

    return (
        <DetailsPage
            variant='dataset'
            resource={json}
            search={mockSearch}
            locale={locale}
            commonDictionary={commonDictionary}
        />
    );
};

export const metadata = {
    title: 'Datasett: Energimålinger kommunale bygg - data.norge.no',
    description: 'POC for detaljvisning',
};

export default DetailsPageWrapper;
