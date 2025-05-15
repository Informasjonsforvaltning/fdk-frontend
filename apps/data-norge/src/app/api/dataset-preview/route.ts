import {
    fetchCsrfToken,
    fetchDatasetPreview
} from '@fdk-frontend/data-access/server';

const {
    FDK_BASE_URI,
    FDK_DATASET_PREVIEW_API_KEY
} = process.env;

export const POST = async function (request: Request) {

    const TEMP_BASE_URI = 'http://localhost:8080';

    try {
        console.log(FDK_BASE_URI, TEMP_BASE_URI, FDK_DATASET_PREVIEW_API_KEY);
        
        const { downloadUrl } = await request.json();
        const referer = request.headers.get('referer') ?? '';

        console.log('downloadUrl', downloadUrl);
        
        const csrfResponse = await fetchCsrfToken({
            baseUri: TEMP_BASE_URI,
            apiKey: `${FDK_DATASET_PREVIEW_API_KEY}`,
            referer 
        });

        const { token } = await csrfResponse.json();
        const cookies = csrfResponse.headers.getSetCookie();
        const previewData = await fetchDatasetPreview({
            baseUri: TEMP_BASE_URI,
            apiKey: `${FDK_DATASET_PREVIEW_API_KEY}`,
            url: downloadUrl,
            rows: 100,
            token,
            cookies,
            referer
        });

        console.log('preview data: ', previewData);
        return new Response(JSON.stringify(previewData), { status: 200 });

    } catch (err) {
        console.error('Failed to get dataset preview', err);
        return new Response('Failed to get dataset preview', { status: 500 });
    }
};
