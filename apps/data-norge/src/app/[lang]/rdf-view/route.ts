const DEFAULT_FORMAT = 'text/turtle';

async function fetchRdf(uri: string, accept: string): Promise<string> {
    const res = await fetch(uri, {
        headers: { Accept: accept },
        next: { revalidate: 0 },
    });
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }
    let text = await res.text();
    const contentType = res.headers.get('Content-Type') ?? '';
    if (contentType.includes('application/json')) {
        try {
            const data = JSON.parse(text);
            text = JSON.stringify(data, null, 2);
        } catch {
            // leave as-is if not valid JSON
        }
    }
    return text;
}

export const GET = async (request: Request) => {
    const url = new URL(request.url);
    const uri = url.searchParams.get('uri');
    const format = url.searchParams.get('format') ?? DEFAULT_FORMAT;

    if (!uri) {
        return new Response('Missing resource URI.', {
            status: 400,
            headers: { 'Content-Type': 'text/plain' },
        });
    }

    try {
        const body = await fetchRdf(uri, format);
        return new Response(body, {
            status: 200,
            headers: { 'Content-Type': format },
        });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Could not load the resource.';
        return new Response(message, {
            status: 502,
            headers: { 'Content-Type': 'text/plain' },
        });
    }
};
