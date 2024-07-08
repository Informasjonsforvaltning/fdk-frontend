import cn from 'classnames';
import { Heading } from '@digdir/designsystemet-react';

import styles from './typography.module.scss';

const HeadingWithDivider = ({ children, className, ...rest }) => {
	return (
		<Heading
			className={cn(styles.headingWithDivider, className)}
			{...rest}
		>
			{children}
		</Heading>
	);
}

export { HeadingWithDivider };