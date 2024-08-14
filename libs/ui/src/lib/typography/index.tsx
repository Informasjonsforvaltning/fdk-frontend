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

export { HeadingWithDivider };
