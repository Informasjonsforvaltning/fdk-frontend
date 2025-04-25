const { FDK_COMMUNITY_BASE_URI } = process.env;

const fetchJson = async (uri: string) => {
    console.log('[debug] fetch uri', uri);

    const response = await fetch(uri, {
        method: 'GET',
        headers: { Accept: 'application/json' },
    });

    console.log('[debug] fetch response', response);

    if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
};

export const getCommunityPosts = (datasetId: string) => {
    const searchParams = new URLSearchParams({
        term: datasetId,
        sortBy: 'topic.lastposttime',
        sortDirection: 'desc',
    });

    const uri = `${FDK_COMMUNITY_BASE_URI}/api/search?${searchParams}`;
    return fetchJson(uri);
};

export const getCommunityTopic = (topicId: string) => {
    const uri = `${FDK_COMMUNITY_BASE_URI}/api/topic/${topicId}`;
    return fetchJson(uri);
};

export const getAllCommunityTopics = async (datasetId: string) => {
    const { posts } = await getCommunityPosts(datasetId);
    const uniqueTopicIds = Array.from(new Set(posts.map((p: any) => p.topic.tid)));
    console.log('[debug] uniqueTopicIds', uniqueTopicIds);
    return Promise.all(uniqueTopicIds.map(getCommunityTopic));
};
