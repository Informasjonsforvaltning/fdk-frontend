import { LocaleCodes } from '@fdk-frontend/dictionaries';
import { redirect } from 'next/navigation';

export type DocsPageType = {
    params: {
        lang: LocaleCodes;
    };
};

export default async function Page({ params }: DocsPageType) {
    return redirect(`/${params.lang}/docs`);
};
