import { PropsWithChildren } from 'react';

import Header, { type HeaderProps } from '../../header';

const HeaderLayout = ({ children, ...props }: HeaderProps & PropsWithChildren) => {
    const { dictionary, locale, frontpage } = props;
    return (
        <>
            <Header
                dictionary={dictionary}
                locale={locale}
                frontpage={frontpage}
            />
            {children}
        </>
    );
};

export default HeaderLayout;
