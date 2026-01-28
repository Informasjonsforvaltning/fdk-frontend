import { NormalLayout } from '@fdk-frontend/ui';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const ContactLayout = async ({ children, params }: LayoutProps<'/[lang]/contact'>) => {
    return <NormalLayout params={params}>{children}</NormalLayout>;
};

export default ContactLayout;
