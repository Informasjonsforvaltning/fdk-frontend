import { LocaleCodes } from '@fdk-frontend/dictionaries';
import { redirect } from 'next/navigation';

export type DetailsPageType = {
    params: {
        lang: LocaleCodes;
    };
};

export default async function Page({ params }: DetailsPageType) {
    return redirect(`/${params.lang}/view`);
}
