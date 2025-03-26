import { PropsWithChildren } from 'react';

import Footer, { type FooterProps } from '../../footer';

const FooterLayout = ({ children, ...props }: FooterProps & PropsWithChildren) => {
    const { dictionary, baseUri } = props;

    return (
        <>
            {children}
            <Footer
                dictionary={dictionary}
                baseUri={baseUri}
            />
        </>
    );
};

export default FooterLayout;
