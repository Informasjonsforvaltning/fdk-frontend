export type LlmSearchResponse<T = unknown> = {
    hits?: T[];
    [key: string]: unknown;
};

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
export const llmSearch = async <T = unknown>(
    endpoint: string,
    query: string,
    options: LlmSearchOptions = {},
): Promise<LlmSearchResponse<T>> => {
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
            body: JSON.stringify({ query: cleanedQuery }),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`LLM search failed with status ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        clearTimeout(timeoutId);
        if (err instanceof Error && err.name === 'AbortError') {
            throw new Error('Request timed out');
        }
        throw err;
    }
};
