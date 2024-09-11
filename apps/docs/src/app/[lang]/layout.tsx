import { PropsWithChildren } from 'react';
import RootLayout, { RootLayoutProps, generateStaticParams } from '@fdk-frontend/ui/layout-root';

import FeedbackLayout from '../components/layouts/feedback-layout';

const Layout = async ({ children, ...rest }: PropsWithChildren & RootLayoutProps) => {
    return (
        <RootLayout {...rest}>
            <FeedbackLayout>{children}</FeedbackLayout>
        </RootLayout>
    );
};

export { generateStaticParams };
export default Layout;
