import React, { PropsWithChildren } from 'react';

import styles from './hstack.module.scss';

const HStack = ({ children, ...props }: PropsWithChildren & React.HTMLAttributes<HTMLDivElement>) => {
    return <div className={styles.wrapper} {...props}>{children}</div>;
};

export default HStack;
