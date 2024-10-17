const apiCallJsonLd = async (method: 'GET', uri: string) =>
    await fetch(`${uri}`, {
        headers: {
            Accept: 'application/ld+json',
        },
        method,
        cache: 'no-cache',
    });

export const getConceptAsJsonLd = async (uri: string) => {
    const res = await apiCallJsonLd('GET', uri);
    return await res.json();
};
