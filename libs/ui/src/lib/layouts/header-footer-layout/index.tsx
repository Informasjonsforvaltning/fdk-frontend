import { PropsWithChildren } from 'react';
import { getDictionary } from '@fdk-frontend/dictionaries';
import { type RootLayoutProps } from '../root-layout';
import HeaderLayout from '../header-layout';
import FooterLayout from '../footer-layout';

const HeaderFooterLayout = async ({ children, params }: PropsWithChildren & RootLayoutProps) => {
    const { lang } = await params;
    const dictionary = await getDictionary(lang, 'common');
    return (
        <HeaderLayout
            dictionary={dictionary}
            locale={lang}
        >
            <FooterLayout
                dictionary={dictionary}
                locale={lang}
            >
                {children}
            </FooterLayout>
        </HeaderLayout>
    );
};

export default HeaderFooterLayout;
