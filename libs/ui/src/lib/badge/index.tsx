import React from 'react';
import cn from 'classnames';

import styles from './badge.module.scss';

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
    'data-color'?: 'orange' | 'green' | 'red' | 'red-subtle' | 'blue-subtle' | 'green-subtle';
};

const Badge = ({ children, className, ...props }: BadgeProps) => (
    <div
        className={cn(styles.badge, className)}
        {...props}
    >
        {children}
    </div>
);

export default Badge;
