import { type Metadata } from 'next';
import { getDictionary, type LocaleCodes, i18n } from '@fdk-frontend/dictionaries';
import SearchPage from '../../components/search-page';

interface Props {
    params: Promise<{
        lang: LocaleCodes;
    }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Page(props: Props) {
    const params = await props.params;
    const locale = params.lang ?? i18n.defaultLocale;
    const dictionary = await getDictionary(locale, 'common');

    return (
        <SearchPage
            dictionaries={{ common: dictionary }}
        />
    );
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const params = await props.params;
    const locale = params.lang ?? i18n.defaultLocale;
    const dictionary = await getDictionary(locale, 'common');

    return {
        title: `${dictionary.header.findDataButton || 'Search'} - data.norge.no`,
        description: `Search for data on data.norge.no`,
        alternates: {
            canonical: `https://data.norge.no/${locale}/search`,
            languages: {
                nb: `https://data.norge.no/nb/search`,
                en: `https://data.norge.no/en/search`,
                nn: `https://data.norge.no/nn/search`,
            },
        },
    };
};
