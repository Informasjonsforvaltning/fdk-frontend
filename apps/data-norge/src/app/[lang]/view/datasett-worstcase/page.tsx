import { i18n, getDictionary } from '@fdk-frontend/dictionaries';

import DetailsPage from '../../../components/details/details-page/datasett-worstcase';
import { DetailsPageWrapperProps } from '../page';

const DatasettRichPageWrapper = async ({ params }: DetailsPageWrapperProps) => {

    const locale = params.lang ?? i18n.defaultLocale;
    const commonDictionary = await getDictionary(locale, 'common');

    return (
        <DetailsPage locale={locale} commonDictionary={commonDictionary} />
    );
}

export const metadata = {
    title: 'Datasett: Energimålinger kommunale bygg - data.norge.no',
    description: 'POC for detaljvisning',
};

export default DatasettRichPageWrapper;