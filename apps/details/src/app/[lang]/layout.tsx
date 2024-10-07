import { PropsWithChildren } from 'react';
import RootLayout, { generateStaticParams } from '@fdk-frontend/ui/layout-root';

import { type Locale, getDictionary } from '@fdk-frontend/dictionaries';

// import FeedbackLayout from '../components/layouts/feedback-layout';

export type DetailsLayoutProps = {
    params: {
        lang: Locale['code'];
    };
};

const DetailsLayout = async ({ children, ...props }: PropsWithChildren & DetailsLayoutProps) => {
    const { lang } = props.params;
    const dictionary = await getDictionary(lang, 'docs');

    const { FDK_DATA_NORGE_BASE_URI, FDK_BASE_URI = '', FDK_COMMUNITY_BASE_URI: communityBaseUri = '/' } = process.env;

    const baseUri = FDK_DATA_NORGE_BASE_URI || FDK_BASE_URI;

    return (
        <RootLayout {...props}>
            {children}
        </RootLayout>
    );
};

export { generateStaticParams };
export default DetailsLayout;
