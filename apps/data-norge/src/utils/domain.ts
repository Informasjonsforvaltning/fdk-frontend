/**
 * Determines if the current domain is the canonical domain for search engine crawling.
 * This function can only be used on the server-side.
 * @returns true if the domain is canonical (production), false otherwise (staging, demo, development)
 */
export const isCanonicalDomain = (): boolean => {
    const { FDK_BASE_URI } = process.env;
    return !FDK_BASE_URI?.match(/^https:\/\/(staging|demo)\./);
};
