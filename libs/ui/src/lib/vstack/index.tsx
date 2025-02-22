import { PropsWithChildren } from 'react';

import styles from './vstack.module.scss';

const VStack = ({ children, ...props }: PropsWithChildren) => {
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
