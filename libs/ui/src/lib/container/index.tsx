import 'server-only';

import { ReactNode } from 'react';
import styles from './container.module.css';

interface Props {
  children: ReactNode;
}

const Container = ({ children }: Props) => <div className={styles.container}>{children}</div>;

export { Container };
