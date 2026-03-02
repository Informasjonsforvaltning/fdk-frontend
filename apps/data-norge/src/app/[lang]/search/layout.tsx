import { NormalLayout } from '@fdk-frontend/ui';
import { type LocaleCodes } from '@fdk-frontend/localization';
import SearchPageClient from '../../components/search-page/search-page-client';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const SearchLayout = async ({
    params,
}: {
    params: Promise<{ lang: string }>;
}) => {
    const resolved = await params;
    const locale = (resolved.lang ?? 'nb') as LocaleCodes;
    return (
        <NormalLayout params={Promise.resolve({ lang: locale })}>
            <SearchPageClient lang={locale} />
        </NormalLayout>
    );
};

export default SearchLayout;
