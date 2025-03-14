const { FDK_MQA_API_BASE_URI } = process.env;

export const getMetadataScores = async (ids: string[]) => {
    const uri = `${FDK_MQA_API_BASE_URI}/api/scores`;
    return await fetch(uri, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            datasets: ids,
        }),
    }).then((res) => res.json());
};
