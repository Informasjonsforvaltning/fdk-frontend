import { PropsWithChildren } from 'react';

import styles from './hstack.module.scss';

const HStack = ({ children, ...props }: PropsWithChildren) => {
	return (
		<div className={styles.wrapper}>
			{children}
		</div>
	);
}

export default HStack;