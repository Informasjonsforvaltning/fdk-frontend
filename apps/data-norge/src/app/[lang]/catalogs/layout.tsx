import { NormalLayout } from '@fdk-frontend/ui';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const CatalogsLayout = async ({ children, params }: LayoutProps<'/[lang]/catalogs'>) => {
    return <NormalLayout params={params}>{children}</NormalLayout>;
};

export default CatalogsLayout;
