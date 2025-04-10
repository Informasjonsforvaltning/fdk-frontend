import React from 'react';
import cn from 'classnames';

import styles from './hstack.module.scss';

const HStack = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(styles.wrapper, className)}
            {...props}
        >
            {children}
        </div>
    );
};

export default HStack;
