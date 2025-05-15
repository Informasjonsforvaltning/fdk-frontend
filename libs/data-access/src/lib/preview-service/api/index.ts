type DatasetPreviewCsrfProps = {
    baseUri: string;
    apiKey: string;
}

export const fetchCsrfToken = async ({ baseUri, apiKey }: DatasetPreviewCsrfProps) => {
	const endpoint = `${baseUri}/preview/csrf`;
	const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
        headers: { 
            Accept: 'application/json',
            'X-API-KEY': apiKey
        }
    });

    if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
    }

    return response;
}

type DatasetPreviewOptions = {
    baseUri: string,
    apiKey: string,
    url: string,
    rows: number,
    token: string,
    cookies: string
};

export const fetchDatasetPreview = async ({
    baseUri,
    apiKey,
    url,
    rows = 100,
    token,
    cookies
}: DatasetPreviewOptions) => {
	const endpoint = `${baseUri}/preview`;
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Cookie: cookies,
            'X-XSRF-TOKEN': token,
            'X-API-KEY': apiKey
        },
        body: JSON.stringify({
            url,
            rows
        }),
    };
    console.log(options);
	const response = await fetch(endpoint, options);

    if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
    }

    return response;
};
