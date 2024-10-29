import { PropsWithChildren } from 'react';

import styles from './helptext-wrapper.module.scss';

const HelptextWrapper = ({ children, ...props }: PropsWithChildren) => {
	return (
		<div className={styles.wrapper}>
			{children}
		</div>
	);
}

export default HelptextWrapper;