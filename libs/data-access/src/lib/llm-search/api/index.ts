// todo: move to fdk-types
export type LlmSearchHitType = 'dataset' | 'dataservice' | 'concept' | 'informationmodel' | 'service' | 'event';

// todo: move to fdk-types
export interface LlmSearchResult {
    id: string;
    title: string;
    description: string;
    type: LlmSearchHitType;
    publisher: string;
    publisherId: string;
}

// todo: move to fdk-types
export interface LlmSearchResponse<THit = LlmSearchResult> {
    hits: THit[];
}

export type LlmSearchOptions = {
    timeout?: number;
};

/**
 * Performs an LLM search query against the specified endpoint.
 * This is a client-side function that can be used in React components.
 *
 * @param endpoint - The full URL of the LLM search endpoint
 * @param query - The search query string
 * @param options - Optional configuration (timeout in milliseconds, defaults to 30000)
 * @returns Promise resolving to the search response JSON
 * @throws Error if the request fails, times out, or returns a non-200 status
 */
const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null;

const isLlmSearchResponseShape = (value: unknown): value is { hits: unknown[] } =>
    isRecord(value) && Array.isArray(value.hits);

export const llmSearch = async <THit = LlmSearchResult>(
    endpoint: string,
    query: string,
    options: LlmSearchOptions = {},
): Promise<LlmSearchResponse<THit>> => {
    const { timeout = 30000 } = options;

    // Strip "?" from query (temp bugfix)
    const cleanedQuery = query.replace(/\?/g, '');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: cleanedQuery,
                type: 'ALL'
            }),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`LLM search failed with status ${response.status}`);
        }

        const json: unknown = await response.json();
        if (!isLlmSearchResponseShape(json)) {
            throw new Error('LLM search returned unexpected payload');
        }

        // Trusted boundary: `THit` is chosen by the caller; we only validate the outer envelope here.
        return { hits: json.hits as THit[] };
    } catch (err) {
        clearTimeout(timeoutId);
        if (err instanceof Error && err.name === 'AbortError') {
            throw new Error('Request timed out');
        }
        throw err;
    }
};
