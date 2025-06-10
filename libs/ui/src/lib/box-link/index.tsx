import React from 'react';
import cn from 'classnames';
import { Link, type LinkProps } from '@digdir/designsystemet-react';
import styles from './styles.module.scss';

const BoxLink = ({ children, className, ...props }: LinkProps) => {
    return (
        <Link
            className={cn('fdk-box-link', className, styles.boxLink)}
            {...props}
        >
            {children}
        </Link>
    );
};

export default BoxLink;
