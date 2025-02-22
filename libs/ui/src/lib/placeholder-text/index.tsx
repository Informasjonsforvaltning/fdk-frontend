import { PropsWithChildren } from 'react';

import styles from './placeholder-text.module.scss';

const PlaceholderText = ({ children }: PropsWithChildren) => {
    return <div className={styles.placeholderText}>{children}</div>;
};

export default PlaceholderText;
