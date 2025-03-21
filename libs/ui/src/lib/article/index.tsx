import { PropsWithChildren } from 'react';

import styles from './article.module.scss';

const Article = ({ children }: PropsWithChildren) => {
    return <div className={styles.article}>{children}</div>;
};

export default Article;
