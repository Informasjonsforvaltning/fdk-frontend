import 'server-only';
import cn from 'classnames';

import { ReactNode } from 'react';
import styles from './container.module.css';

type Props = {
  children: ReactNode;
  extendedClassName?: string;
};

const Container = ({ children, extendedClassName }: Props) => (
  <div className={cn(styles.container, extendedClassName)}>{children}</div>
);

export { Container };
