import { PropsWithChildren } from 'react';
import cn from 'classnames';

import styles from './badge.module.scss';

export type BadgeProps = PropsWithChildren & {
	'data-color'?: 'orange' | 'green' | 'red';
}

const Badge = ({ children, className, ...props }: BadgeProps) => 
	<div className={cn(styles.badge, className)} {...props}>{children}</div>;

export default Badge;
