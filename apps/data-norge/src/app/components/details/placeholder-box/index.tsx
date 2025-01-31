import { PropsWithChildren } from 'react';

import PlaceholderText from '../placeholder-text';

import styles from './placeholder-box.module.scss';

const PlaceholderBox = ({ children }: PropsWithChildren) => {
    return (
        <div className={styles.placeholderBox}>
            <PlaceholderText>{children}</PlaceholderText>
        </div>
    );
};

export default PlaceholderBox;
