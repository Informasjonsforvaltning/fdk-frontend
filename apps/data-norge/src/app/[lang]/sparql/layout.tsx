import { NormalLayout } from '@fdk-frontend/ui';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const SparqlLayout = async ({ children, params }: LayoutProps<'/[lang]/sparql'>) => {
    return <NormalLayout params={params}>{children}</NormalLayout>;
};

export default SparqlLayout;
