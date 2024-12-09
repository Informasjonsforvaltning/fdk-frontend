import { i18n, getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';

import DetailsPage from '../../components/details/details-page';

export type DetailsPageWrapperProps = {
    params: Promise<{
        lang: LocaleCodes;
        slug: string[];
    }>;
};

const DetailsPageWrapper = async (props: DetailsPageWrapperProps) => {
    const params = await props.params;
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
    title: 'Datasett: Energimålinger kommunale bygg - data.norge.no',
    description: 'POC for detaljvisning',
};

export default DetailsPageWrapper;
