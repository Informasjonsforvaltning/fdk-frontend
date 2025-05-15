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
        // console.log(FDK_BASE_URI, TEMP_BASE_URI, FDK_DATASET_PREVIEW_API_KEY);

        const { downloadUrl } = await request.json();

        console.log('downloadUrl', downloadUrl);
        
        const csrfResponse = await fetchCsrfToken({
            baseUri: TEMP_BASE_URI,
            apiKey: FDK_DATASET_PREVIEW_API_KEY
        });

        const { token } = await csrfResponse.json();
        
        console.log('token', token);

        const cookies = csrfResponse.header?.get('set-cookie') ||
            csrfResponse.headers.get('Set-Cookie') ||
            '';

        console.log('cookies', cookies);

        const previewData = await fetchDatasetPreview({
            baseUri: TEMP_BASE_URI,
            apiKey: FDK_DATASET_PREVIEW_API_KEY,
            url: downloadUrl,
            token,
            cookies
        });

        console.log('previewData', previewData);

        return new Response(previewData, { status: 200 });

    } catch (err) {
        console.error('Failed to get dataset preview', err);
        return new Response('Invalid request body', { status: 500 });
    }
};
