import { NormalLayout } from '@fdk-frontend/ui';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const DataHunterLayout = async ({ children, params }: LayoutProps<'/[lang]/data-hunter'>) => {
    return <NormalLayout params={params}>{children}</NormalLayout>;
};

export default DataHunterLayout;
