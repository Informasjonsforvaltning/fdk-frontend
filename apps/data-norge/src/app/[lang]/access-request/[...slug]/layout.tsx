import { BlankLayout } from '@fdk-frontend/ui';
import { PropsWithChildren } from 'react';
import { LocaleCodes } from '@fdk-frontend/dictionaries';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const AccessRequestLayout = async ({
    children,
    params
}: PropsWithChildren & {
    params: Promise<{ lang: string; slug: string[] }>
}) => {
    const typedParams = params as Promise<{ lang: LocaleCodes; slug: string[] }>;
    return <BlankLayout params={typedParams}>{children}</BlankLayout>;
};

export default AccessRequestLayout;
