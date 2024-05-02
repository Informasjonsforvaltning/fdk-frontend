import 'server-only';
import cn from 'classnames';

import styles from './container.module.css';
import React, { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Container = ({ children, className }: ContainerProps) => (
  <div className={cn(styles.container, className)}>{children}</div>
);

export { Container };
