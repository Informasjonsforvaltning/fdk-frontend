import { i18n, getDictionary } from '@fdk-frontend/dictionaries';

import DetailsPage from '../../../components/details/details-page/begrep';
import { DetailsPageWrapperProps } from '../page';

const BegrepsPageWrapper = async (props: DetailsPageWrapperProps) => {
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
    title: 'Begrep: egenandel på dagpenger - data.norge.no',
    description: 'POC for detaljvisning',
};

export default BegrepsPageWrapper;
