import { Link as DSLink } from '@digdir/designsystemet-react';
import NextLink from 'next/link';
import React from 'react';

export type LinkProps = {
    href: string;
    className?: string;
    external?: boolean;
    children?: React.ReactNode;
} & React.HTMLAttributes<HTMLAnchorElement>;

const Link = ({ href, children, className, external, ...rest }: LinkProps) => (
    <DSLink
        asChild
        {...rest}
    >
        <NextLink
            className={className}
            href={href}
            target={external ? '_blank' : '_self'}
        >
            {children}
        </NextLink>
    </DSLink>
);

export { Link };
