import 'server-only';
import cn from 'classnames';

import styles from './container.module.css';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Container = ({ children, className }: Props) => <div className={cn(styles.container, className)}>{children}</div>;

export { Container };
