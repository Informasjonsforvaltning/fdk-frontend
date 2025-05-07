export const fetchCsrfToken = async (baseUri: string, apiKey: string) => {
	const endpoint = `${baseUri}/dataset/preview/csrf`;
	const response = await fetch(endpoint, {
        method: 'GET',
        credentials: 'include',
        headers: { Accept: 'application/json', 'X-API-KEY': apiKey }        
    });

    if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export const fetchDatasetPreview = async (
	baseUri: string,
	apiKey: string,
	downloadUrl: string,
	rows: number,
	token: string
) => {
	const endpoint = `${baseUri}/dataset/preview`;
	const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
        	'X-XSRF-TOKEN': token,
      		'X-API-KEY': apiKey,
        	Accept: 'application/json'
        },
        body: JSON.stringify({
            url: downloadUrl,
            rows
        }),
    });

    if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
};
