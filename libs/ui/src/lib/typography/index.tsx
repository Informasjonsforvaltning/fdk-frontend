import React from 'react';
import cn from 'classnames';
import { Heading, HeadingProps } from '@digdir/designsystemet-react';

import styles from './typography.module.scss';

const HeadingWithDivider = ({ children, className, ...rest }: HeadingProps) => (
    <Heading
        className={cn(styles.headingWithDivider, className)}
        {...rest}
    >
        {children}
    </Heading>
);

const Subtext = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span
        className={cn(styles.subtext, className)}
        {...props}
    />
);

export { HeadingWithDivider, Subtext };
