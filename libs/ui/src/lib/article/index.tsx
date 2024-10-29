import { PropsWithChildren } from 'react';

import styles from './article.module.scss';

const Article = ({ children }: PropsWithChildren) => {
	return (
		<div className={styles.wrapper}>
			{children}
		</div>
	);
}

export default Article;