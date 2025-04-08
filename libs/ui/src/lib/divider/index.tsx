import React from 'react';
import cn from 'classnames';
import styles from './divider.module.scss';

const BrandDivider = ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => {
    return (
        <hr
            className={cn(styles.brandDivider, className)}
            {...props}
        />
    );
};

export { BrandDivider };
