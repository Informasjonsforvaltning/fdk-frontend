import { type LocaleCodes } from '@fdk-frontend/dictionaries';
import { type CatalogTypes } from '@fdk-frontend/types';

export const getAccessRequestDestination = async (params: {
	lang: LocaleCodes;
	kind: CatalogTypes;
	id: string;
}) => {
	const { lang, kind, id } = params;
	const { ACCESS_REQUEST_API_HOST } = process.env;
    const uri = `${ACCESS_REQUEST_API_HOST}/access-request/${lang}/${kind}/${id}`;
    return await fetch(uri, { method: 'POST' })
    .then(response => {
        if (!response.ok) throw new Error('access request destination not found');
        return response.text();
    });
};
