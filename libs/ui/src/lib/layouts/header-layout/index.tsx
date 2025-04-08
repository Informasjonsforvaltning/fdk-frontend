import { PropsWithChildren } from 'react';

import Header, { type HeaderProps } from '../../header';

const HeaderLayout = ({ children, ...props }: HeaderProps & PropsWithChildren) => {
    const { dictionary, locale, registrationBaseUri, communityBaseUri, frontpage } = props;

    return (
        <>
            <Header
                dictionary={dictionary}
                locale={locale}
                registrationBaseUri={registrationBaseUri}
                communityBaseUri={communityBaseUri}
                frontpage={frontpage}
            />
            {children}
        </>
    );
};

export default HeaderLayout;
