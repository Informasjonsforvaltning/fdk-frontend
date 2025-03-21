import React from 'react';

import styles from './vstack.module.scss';

const VStack = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={styles.wrapper}
            {...props}
        >
            {children}
        </div>
    );
};

export default VStack;
