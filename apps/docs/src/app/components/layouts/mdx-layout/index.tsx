import styles from './mdx-layout.module.scss';

const MdxLayout = (props) => {
	return (
		<article className={styles.article}>
			{props.children}
		</article>
	);
}

export default MdxLayout;