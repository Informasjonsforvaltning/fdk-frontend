import { PropsWithChildren } from 'react';
import { type RootLayoutProps } from '../root-layout';

const BlankLayout = async ({ children, params }: PropsWithChildren & RootLayoutProps) => {
    return <div>{children}</div>;
};

export default BlankLayout;
