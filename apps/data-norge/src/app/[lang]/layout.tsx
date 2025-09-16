import { RootLayout as RootLayoutBase, generateStaticParams } from '@fdk-frontend/ui';
import { PropsWithChildren } from 'react';
import { LocaleCodes } from '@fdk-frontend/dictionaries';

const RootLayout = async ({
    children,
    params
}: PropsWithChildren & {
    params: Promise<{ lang: string }>
}) => {
    const typedParams = params as Promise<{ lang: LocaleCodes }>;
    return <RootLayoutBase params={typedParams}>{children}</RootLayoutBase>;
};

export default RootLayout;
export { generateStaticParams };
