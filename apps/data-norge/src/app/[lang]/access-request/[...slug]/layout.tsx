import styles from './access-request-layout.module.scss';

export default function AccessRequestLayout({children, ...props}) {
	return (<div className={styles.wrapper}>{children}</div>);
}