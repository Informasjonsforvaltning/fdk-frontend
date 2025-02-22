const {
    FDK_COMMUNITY_BASE_URI
} = process.env;

export const getCommunityPosts = async (searchParams: string) => {
    const uri = `${FDK_COMMUNITY_BASE_URI}/api/search?${searchParams}`;
    return await fetch(uri, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    }).then(res => res.json());
};

export const getCommunityTopic = async (topicId: string) => {
    const uri = `${FDK_COMMUNITY_BASE_URI}/api/topic/${topicId}`;
    return await fetch(uri, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    }).then(res => res.json());
};