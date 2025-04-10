import React from 'react';
import cn from 'classnames';
import styles from './badge-overlay.module.scss';

import Badge, { type BadgeProps } from '../badge';

type BadgeOverlayProps = {
    badgeProps: BadgeProps;
};

const BadgeOverlay = ({ children, badgeProps, ...props }: BadgeOverlayProps & React.HTMLAttributes<HTMLDivElement>) => {
    const { className: badgeClassName, ...restBadgeProps } = badgeProps;
    return (
        <div
            className={styles.wrapper}
            {...props}
        >
            <Badge
                className={cn(styles.badge, badgeClassName)}
                {...restBadgeProps}
            />
            {children}
        </div>
    );
};

export default BadgeOverlay;
