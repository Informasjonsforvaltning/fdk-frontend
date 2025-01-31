import React, { PropsWithChildren } from 'react';
import cn from 'classnames';

import styles from './hstack.module.scss';

const HStack = ({ children, className, ...props }: PropsWithChildren & React.HTMLAttributes<HTMLDivElement>) => {
    return <div className={cn(styles.wrapper, className)} {...props}>{children}</div>;
};

export default HStack;
