import React from 'react';
import cn from 'classnames';

import styles from './box.module.scss';

const Box = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return <div className={cn(styles.box, className)}>{children}</div>;
};

export default Box;
