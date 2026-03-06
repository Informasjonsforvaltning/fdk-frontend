import { BlankLayout } from '@fdk-frontend/ui';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const AccessRequestLayout = async ({ children, params }: LayoutProps<'/[lang]/access-request/[...slug]'>) => {
    return <BlankLayout params={params}>{children}</BlankLayout>;
};

export default AccessRequestLayout;
