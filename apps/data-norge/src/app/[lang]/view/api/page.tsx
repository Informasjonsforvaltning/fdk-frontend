import { i18n, getDictionary } from '@fdk-frontend/dictionaries';

import DetailsPage from '../../../components/details/details-page/api';
import { DetailsPageWrapperProps } from '../page';

const APIPageWrapper = async ({ params }: DetailsPageWrapperProps) => {
    const locale = params.lang ?? i18n.defaultLocale;
    const commonDictionary = await getDictionary(locale, 'common');

    return (
        <DetailsPage
            locale={locale}
            commonDictionary={commonDictionary}
        />
    );
};

export const metadata = {
    title: 'API: Inntektsmottakere API - data.norge.no',
    description: 'POC for detaljvisning',
};

export default APIPageWrapper;
