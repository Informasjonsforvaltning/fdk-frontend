import { NormalLayout } from '@fdk-frontend/ui';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const DatasetLayout = async ({ children, params }: LayoutProps<'/[lang]/datasets/[id]'>) => {
    return <NormalLayout params={params}>{children}</NormalLayout>;
};

export default DatasetLayout;
