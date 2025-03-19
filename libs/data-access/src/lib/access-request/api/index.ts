export const getAccessRequestDestination = async (topicId: string) => {
	const { ACCESS_REQUEST_API_HOST } = process.env;
    const uri = `${FDK_COMMUNITY_BASE_URI}/api/topic/${topicId}`;
    return await fetch(uri, { method: 'POST' })
    .then(response => {
        if (!response.ok) throw new Error('access request destination not found');
        return response.text();
    });
};
