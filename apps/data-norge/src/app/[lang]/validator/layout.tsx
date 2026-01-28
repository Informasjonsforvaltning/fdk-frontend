import { NormalLayout } from '@fdk-frontend/ui';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const ValidatorLayout = async ({ children, params }: LayoutProps<'/[lang]/validator'>) => {
    return <NormalLayout params={params}>{children}</NormalLayout>;
};

export default ValidatorLayout;
