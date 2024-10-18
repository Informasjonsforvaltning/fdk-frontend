import { PropsWithChildren } from 'react';

import styles from './badge.module.scss';

const Badge = ({ children, ...props }: PropsWithChildren) => <div className={styles.badge}>{children}</div>;

export default Badge;
