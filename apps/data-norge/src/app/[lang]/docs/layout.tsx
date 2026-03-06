import { NormalLayout } from '@fdk-frontend/ui';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const DocsLayout = async ({ children, params }: LayoutProps<'/[lang]/docs'>) => {
    return <NormalLayout params={params}>{children}</NormalLayout>;
};

export default DocsLayout;
