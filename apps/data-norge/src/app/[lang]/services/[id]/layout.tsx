import { NormalLayout } from '@fdk-frontend/ui';
import { PropsWithChildren } from 'react';
import { LocaleCodes } from '@fdk-frontend/localization';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const ServiceLayout = async ({
    children,
    params,
}: PropsWithChildren & {
    params: Promise<{ lang: string; id: string }>;
}) => {
    const typedParams = params as Promise<{ lang: LocaleCodes; id: string }>;
    return <NormalLayout params={typedParams}>{children}</NormalLayout>;
};

export default ServiceLayout;
