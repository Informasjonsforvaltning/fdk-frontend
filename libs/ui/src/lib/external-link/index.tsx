'use client';

import { type PropsWithChildren } from 'react';
import { Link, type LinkProps } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { i18n, type LocaleCodes } from '@fdk-frontend/dictionaries';

export type ExternalLinkProps = Omit<LinkProps, 'children'> &
    PropsWithChildren & {
        locale?: LocaleCodes;
        showIcon?: boolean;
        gateway?: boolean;
    };

const ExternalLink = ({ children, showIcon, locale = i18n.defaultLocale, gateway, ...props }: ExternalLinkProps) => {
    const { href = '' } = props;

    const searchParams = new URLSearchParams();
    searchParams.set('url', href);
    const gatewayLink = `/${locale}/leaving-gateway?${searchParams}`;

    // Needed to bypass gateway where an assumed external link actually points to data.norge.no
    const destination = new URL(href, window.location.href);
    const current = new URL(window.location.href);
    const isSameHostname = destination.hostname === current.hostname;

    const target = gateway && !isSameHostname ? gatewayLink : href;

    return (
        <Link
            {...props}
            href={target}
        >
            {children}
            {showIcon && (
                <ExternalLinkIcon
                    aria-hidden
                    fontSize='1em'
                    style={{ marginLeft: '0.125em' }}
                />
            )}
        </Link>
    );
};

export default ExternalLink;
