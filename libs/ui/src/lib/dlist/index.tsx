import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

const DList = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(styles.container, className)}
            {...props}
        >
            <dl className={styles.dlist}>{children}</dl>
        </div>
    );
};

export default DList;
