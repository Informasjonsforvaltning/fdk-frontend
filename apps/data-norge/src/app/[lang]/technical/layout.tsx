import { NormalLayout } from '@fdk-frontend/ui';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const TechnicalLayout = async ({ children, params }: LayoutProps<'/[lang]/technical'>) => {
    return <NormalLayout params={params}>{children}</NormalLayout>;
};

export default TechnicalLayout;
