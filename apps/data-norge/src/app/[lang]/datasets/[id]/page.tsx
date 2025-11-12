import { notFound, redirect } from 'next/navigation';
import { i18n, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { getSlug } from '@fdk-frontend/utils';
import { getDataset } from '@fdk-frontend/data-access/server';

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
    // Fetch dataset to get the canonical slug
    try {
        const dataset = await getDataset(params.id);
        const canonicalSlug = getSlug(dataset, locale);

        // Preserve query parameters
        const queryString = searchParams ? new URLSearchParams(searchParams as Record<string, string>).toString() : '';
        redirectUrl = queryString
            ? `/${locale}/datasets/${params.id}/${canonicalSlug}?${queryString}`
            : `/${locale}/datasets/${params.id}/${canonicalSlug}`;
    } catch (err) {
        console.error(`Failed to get dataset with ID ${params.id}`, JSON.stringify(err));
        notFound();
    }

    if (redirectUrl) {
        redirect(redirectUrl);
    }
};

export default DetailsPageWrapper;
