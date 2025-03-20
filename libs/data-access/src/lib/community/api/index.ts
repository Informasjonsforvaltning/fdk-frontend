const { FDK_COMMUNITY_BASE_URI } = process.env;

export const getCommunityPosts = async (datasetId: string) => {

    const searchParams = new URLSearchParams();

    searchParams.set('term', datasetId);
    searchParams.set('sortBy', 'topic.lastposttime');
    searchParams.set('sortDirection', 'desc');

    const uri = `${FDK_COMMUNITY_BASE_URI}/api/search?${searchParams}`;
    return await fetch(uri, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) throw new Error('community posts not found');
        return response.json()
    });
};

export const getCommunityTopic = async (topicId: string) => {
    const uri = `${FDK_COMMUNITY_BASE_URI}/api/topic/${topicId}`;
    return await fetch(uri, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) throw new Error('community topics not found');
        return response.json()
    });
};

export const getAllCommunityTopics = async (datasetId: string) => {
    const communitySearch = await getCommunityPosts(datasetId);
    const uniqueTopics = new Set<string>();
    communitySearch.posts.forEach((post: any) => uniqueTopics.add(post.topic.tid));
    return await Promise.all(
        Array.from(uniqueTopics).map(async (topicId: string) => {
            return await getCommunityTopic(topicId);
        })
    );
}