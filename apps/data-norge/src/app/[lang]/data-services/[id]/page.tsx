import { notFound, redirect } from 'next/navigation';
import { i18n, type LocaleCodes } from '@fdk-frontend/localization';
import { getSlug } from '@fdk-frontend/utils';
import { getApi } from '@fdk-frontend/data-access/server';

export type DetailsPageWrapperProps = {
    params: Promise<{
        lang: LocaleCodes;
        id: string;
    }>;
    searchParams: Promise<any>;
};

const DetailsPageWrapper = async (props: DetailsPageWrapperProps) => {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const locale = params.lang ?? i18n.defaultLocale;

    let redirectUrl = null;
    // Fetch data service to get the canonical slug
    try {
        const dataService = await getApi(params.id);
        const canonicalSlug = getSlug(dataService, locale);

        // Preserve query parameters
        const queryString = searchParams ? new URLSearchParams(searchParams as Record<string, string>).toString() : '';
        redirectUrl = queryString
            ? `/${locale}/data-services/${params.id}/${canonicalSlug}?${queryString}`
            : `/${locale}/data-services/${params.id}/${canonicalSlug}`;
    } catch (err) {
        console.error(`Failed to get data service with ID ${params.id}`, JSON.stringify(err));
        notFound();
    }

    if (redirectUrl) {
        redirect(redirectUrl);
    }
};

export default DetailsPageWrapper;
