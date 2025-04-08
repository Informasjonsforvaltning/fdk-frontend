import React from 'react';
import cn from 'classnames';

import styles from './icon-badge.module.scss';

const IconBadge = ({
    children,
    className,
    fontSize = '1.5rem',
    ...rest
}: React.HTMLAttributes<HTMLDivElement> & { fontSize?: string }) => {
    return (
        <div
            className={cn(styles.iconBadge, className)}
            style={{ fontSize }}
            {...rest}
        >
            {children}
        </div>
    );
};

export default IconBadge;
