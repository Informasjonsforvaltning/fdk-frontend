import { PropsWithChildren } from 'react';

import Footer, { type FooterProps } from '../../footer';

const FooterLayout = ({ children, locale }: FooterProps & PropsWithChildren) => {
    return (
        <>
            {children}
            <Footer locale={locale} />
        </>
    );
};

export default FooterLayout;
