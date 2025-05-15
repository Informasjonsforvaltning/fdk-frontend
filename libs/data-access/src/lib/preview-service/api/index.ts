type DatasetPreviewCsrfProps = {
    baseUri: string;
    apiKey: string;
    referer: string;
};

export const fetchCsrfToken = async ({ baseUri, apiKey, referer }: DatasetPreviewCsrfProps) => {
    const endpoint = `${baseUri}/preview/csrf`;

    console.log(`Fetching CSRF token`, JSON.stringify({ endpoint, apiKey }));

    const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'X-API-KEY': apiKey,
            Referer: referer,
        },
    });

    if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
    }

    return response;
};

type DatasetPreviewOptions = {
    baseUri: string;
    apiKey: string;
    url: string;
    rows: number;
    token: string;
    cookies: string[];
    referer: string;
};

export const fetchDatasetPreview = async ({
    baseUri,
    apiKey,
    url,
    rows = 100,
    token,
    cookies,
    referer,
}: DatasetPreviewOptions) => {
    const endpoint = `${baseUri}/preview`;

    console.log(`Fetching dataset preview`, JSON.stringify({ url, endpoint, apiKey, token }));

    const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': token,
            'X-API-KEY': apiKey,
            Cookie: cookies.join('; '),
            Referer: referer,
        },
        body: JSON.stringify({
            url,
            rows,
        }),
    });

    if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
};
