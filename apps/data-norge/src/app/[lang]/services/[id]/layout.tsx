import { NormalLayout } from '@fdk-frontend/ui';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const ServiceLayout = async ({ children, params }: LayoutProps<'/[lang]/services/[id]'>) => {
    return <NormalLayout params={params}>{children}</NormalLayout>;
};

export default ServiceLayout;
