import { PropsWithChildren } from 'react';
import { type RootLayoutProps } from '../root-layout';
import HeaderLayout from '../header-layout';
import FooterLayout from '../footer-layout';
import { LocaleCodes } from '@fdk-frontend/localization';

const HeaderFooterLayout = async ({ children, params }: PropsWithChildren & RootLayoutProps) => {
    const { lang } = await params;
    const locale = lang as LocaleCodes;
    return (
        <HeaderLayout locale={locale}>
            <FooterLayout locale={locale}>{children}</FooterLayout>
        </HeaderLayout>
    );
};

export default HeaderFooterLayout;
