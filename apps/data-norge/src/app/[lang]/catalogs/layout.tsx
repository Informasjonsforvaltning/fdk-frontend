import { NormalLayout } from '@fdk-frontend/ui';
import { PropsWithChildren } from 'react';
import { LocaleCodes } from '@fdk-frontend/dictionaries';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const CatalogsLayout = async ({
    children,
    params
}: PropsWithChildren & {
    params: Promise<{ lang: string }>
}) => {
    const typedParams = params as Promise<{ lang: LocaleCodes }>;
    return <NormalLayout params={typedParams}>{children}</NormalLayout>;
};

export default CatalogsLayout;
