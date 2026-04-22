import React from 'react';
import cn from 'classnames';
import { Link, type LinkProps } from '@digdir/designsystemet-react';

import DigdirEmblem from '../core/svg/digdir-emblem';
import DigdirLogo from '../core/svg/digdir-logo';
import DpgBadge from '../core/svg/dpg-badge';

import transportLogoSrc from './images/transport-logo.svg';
import styles from './logo.module.scss';

export type LogoVariant = 'default' | 'transport';

type LogoProps = {
    variant?: LogoVariant;
};

const Logo = ({ variant = 'default' }: LogoProps = {}) => {
    if (variant === 'transport') {
        const src = typeof transportLogoSrc === 'string' ? transportLogoSrc : transportLogoSrc.src;
        return (
            <div className={styles.logo}>
                <img
                    src={src}
                    alt='Transportportalen.no'
                    className={styles.transportLogo}
                />
            </div>
        );
    }
    return (
        <div className={styles.logo}>
            <DigdirEmblem />
            <span>data.norge.no</span>
        </div>
    );
};

export type LogoLinkProps = {
    baseUri?: string;
    variant?: LogoVariant;
};

const LogoLink = ({ className, variant, ...rest }: LogoLinkProps & Omit<LinkProps, 'children'>) => (
    <Link
        className={cn(styles.logoLink, 'ds-button', className)}
        data-size='sm'
        data-variant='tertiary'
        {...rest}
    >
        <Logo variant={variant} />
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
