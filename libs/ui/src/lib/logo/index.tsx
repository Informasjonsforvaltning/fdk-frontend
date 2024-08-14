import React from 'react';
import cn from 'classnames';
import { Link } from '@digdir/designsystemet-react';

import DigdirEmblem from './images/digdir-emblem';

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

const LogoLink = ({ className, baseUri, ...rest }: LogoLinkProps & React.HTMLAttributes<HTMLAnchorElement>) => (
    <Link
        href={baseUri}
        className={cn(styles.logoLink, className)}
        {...rest}
    >
        <Logo />
    </Link>
);

export { Logo, LogoLink };
