import 'server-only';

import { HTMLAttributes, ReactNode } from 'react';
import styles from './container.module.css';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  flexDirection?: 'row' | 'column';
}

const Container = ({ children, flexDirection = 'row', ...rest }: Props) => (
  <div
    className={flexDirection === 'row' ? styles.containerRow : styles.containerColumn}
    {...rest}
  >
    {children}
  </div>
);

export { Container };
