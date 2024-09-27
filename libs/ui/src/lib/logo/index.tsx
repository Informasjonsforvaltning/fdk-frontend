import React from 'react';
import cn from 'classnames';
import { Link, type LinkProps } from '@digdir/designsystemet-react';

import DigdirEmblem from '../core/svg/digdir-emblem';
import DigdirLogo from '../core/svg/digdir-logo';

import styles from './logo.module.scss';

const Logo = () => (
    <div className={styles.logo}>
        <DigdirEmblem />
        <span>data.norge.no</span>
    </div>
);

export type LogoLinkProps = {
    baseUri?: string;
};

const LogoLink = ({ className, baseUri, ...rest }: LogoLinkProps & Omit<LinkProps, 'children'>) => (
    <Link
        href={baseUri}
        className={cn(styles.logoLink, className)}
        {...rest}
    >
        <Logo />
    </Link>
);

const DigdirLogoLink = ({ className, ...props }: Omit<LinkProps, 'children'>) => (
    <Link
        className={cn(styles.digdirLogoLink, className)}
        {...props}
    >
        <DigdirLogo />
    </Link>
);

export { Logo, LogoLink, DigdirLogoLink };
