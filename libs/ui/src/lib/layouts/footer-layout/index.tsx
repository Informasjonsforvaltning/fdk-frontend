import { PropsWithChildren } from 'react';

import Footer, { type FooterProps } from '../../footer';

const FooterLayout = ({ children, ...props }: FooterProps & PropsWithChildren) => {
    const { dictionary, locale } = props;

    return (
        <>
            {children}
            <Footer
                dictionary={dictionary}
                locale={locale}
            />
        </>
    );
};

export default FooterLayout;
