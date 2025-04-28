export const fetchCsrfToken = async (baseUri: string) => {
	const endpoint = `${baseUri}/dataset/preview/csrf`;
	const response = await fetch(endpoint, {
        method: 'GET',
        withCredentials: true,
        headers: { Accept: 'application/json' },
        mode: 'cors'
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
        withCredentials: true,
        headers: {
        	'X-CSRF-TOKEN': token,
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
