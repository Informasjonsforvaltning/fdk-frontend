import { PropsWithChildren } from 'react';
import { type RootLayoutProps } from '../root-layout';
import HeaderLayout from '../header-layout';
import FooterLayout from '../footer-layout';

const HeaderFooterLayout = async ({ children, params }: PropsWithChildren & RootLayoutProps) => {
    const { lang } = await params;
    return (
        <HeaderLayout locale={lang}>
            <FooterLayout locale={lang}>
                {children}
            </FooterLayout>
        </HeaderLayout>
    );
};

export default HeaderFooterLayout;
