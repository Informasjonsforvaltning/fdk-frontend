import { NormalLayout } from '@fdk-frontend/ui';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const AboutLayout = async ({ children, params }: LayoutProps<'/[lang]/about'>) => {
    return <NormalLayout params={params}>{children}</NormalLayout>;
};

export default AboutLayout;
