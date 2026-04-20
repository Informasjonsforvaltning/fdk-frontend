import { PropsWithChildren } from 'react';

import Header, { type HeaderProps } from '../../header';

const HeaderLayout = ({ children, locale, frontpage, showSearchInput }: HeaderProps & PropsWithChildren) => {
    return (
        <>
            <Header
                locale={locale}
                frontpage={frontpage}
                showSearchInput={showSearchInput}
            />
            {children}
        </>
    );
};

export default HeaderLayout;
