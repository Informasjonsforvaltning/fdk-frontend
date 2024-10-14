import { PropsWithChildren } from 'react';
import RootLayout, { generateStaticParams } from '@fdk-frontend/ui/layout-root';

import { type Locale, getDictionary } from '@fdk-frontend/dictionaries';

import FeedbackLayout from '@fdk-frontend/ui/layouts/feedback-layout';

export type DetailsLayoutProps = {
    params: {
        lang: Locale['code'];
    };
};

const DetailsLayout = async ({ children, ...props }: PropsWithChildren & DetailsLayoutProps) => {
    const { lang } = props.params;
    const dictionary = await getDictionary(lang, 'docs');

    return (
        <RootLayout {...props}>
            <FeedbackLayout
                dictionary={dictionary}
                baseUri={''}
                communityBaseUri={''}
            >
                {children}
            </FeedbackLayout>
        </RootLayout>
    );
};

export { generateStaticParams };
export default DetailsLayout;
