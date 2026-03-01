import { PropsWithChildren } from 'react';

import Header, { type HeaderProps } from '../../header';

const HeaderLayout = ({ children, locale, frontpage }: HeaderProps & PropsWithChildren) => {
    return (
        <>
            <Header
                locale={locale}
                frontpage={frontpage}
            />
            {children}
        </>
    );
};

export default HeaderLayout;
