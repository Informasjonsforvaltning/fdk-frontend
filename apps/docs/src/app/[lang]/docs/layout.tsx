import Sidebar from '../../components/sidebar';

const DocsLayout = (props) => {

	return (
		<div>
			<Sidebar locale={props.params.lang} />
			Hello
			{props.children}
		</div>
	);
}

export default DocsLayout;