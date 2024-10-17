import { PropsWithChildren } from 'react';

import Header, { type HeaderProps } from '../../header';

const HeaderLayout = ({ children, ...props }: HeaderProps & PropsWithChildren) => {
    const { dictionary, baseUri, registrationBaseUri, communityBaseUri, frontpage } = props;

    return (
        <>
            <Header
                dictionary={dictionary}
                baseUri={baseUri}
                registrationBaseUri={registrationBaseUri}
                communityBaseUri={communityBaseUri}
                frontpage={frontpage}
            />
            {children}
        </>
    );
};

export default HeaderLayout;
