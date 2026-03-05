import React from 'react';
import cn from 'classnames';
import { Link, type LinkProps } from '@digdir/designsystemet-react';

import DigdirEmblem from '../core/svg/digdir-emblem';
import DigdirLogo from '../core/svg/digdir-logo';
import DpgBadge from '../core/svg/dpg-badge';

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

const LogoLink = ({ className, ...rest }: LogoLinkProps & Omit<LinkProps, 'children'>) => (
    <Link
        className={cn(styles.logoLink, 'ds-button', className)}
        data-size='sm'
        data-variant='tertiary'
        {...rest}
    >
        <Logo />
    </Link>
);

const DpgLink = ({ className, ...props }: Omit<LinkProps, 'children'>) => (
    <Link
        className={cn(styles.dpgLink, 'ds-button', className)}
        data-size='sm'
        data-variant='tertiary'
        {...props}
    >
        <DpgBadge />
    </Link>
);

const DigdirLogoLink = ({ className, ...props }: Omit<LinkProps, 'children'>) => (
    <Link
        className={cn(styles.digdirLogoLink, 'ds-button', className)}
        data-size='sm'
        data-variant='tertiary'
        {...props}
    >
        <DigdirLogo />
    </Link>
);

export { Logo, LogoLink, DpgLink, DigdirLogoLink };
