import { fetchCsrfToken, fetchDatasetPreview } from '@fdk-frontend/data-access/server';

const { FDK_BASE_URI, FDK_DATASET_PREVIEW_API_KEY, FDK_DATASET_PREVIEW_LOCAL_BASE_URI } = process.env;

export const POST = async function (request: Request) {
    try {
        const baseUri =
            process.env.NODE_ENV === 'development' ? FDK_DATASET_PREVIEW_LOCAL_BASE_URI : `${FDK_BASE_URI}/dataset`;

        const { downloadUrl } = await request.json();
        const referer = request.headers.get('referer') ?? '';

        const csrfResponse = await fetchCsrfToken({
            baseUri: `${baseUri}`,
            apiKey: `${FDK_DATASET_PREVIEW_API_KEY}`,
            referer,
        });

        const { token } = await csrfResponse.json();
        const cookies = csrfResponse.headers.getSetCookie();
        const previewData = await fetchDatasetPreview({
            baseUri: `${baseUri}`,
            apiKey: `${FDK_DATASET_PREVIEW_API_KEY}`,
            url: downloadUrl,
            rows: 100,
            token,
            cookies,
            referer,
        });
        return new Response(JSON.stringify(previewData), { status: 200 });
    } catch (err) {
        console.error('Failed to get dataset preview', JSON.stringify(err));
        return new Response('Failed to get dataset preview', { status: 500 });
    }
};
