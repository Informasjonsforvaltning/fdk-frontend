import SidebarLayout from '../../components/layouts/sidebar-layout';
import MdxLayout from '../../components/layouts/mdx-layout';

const DocsLayout = async ({ children, ...rest }) => {

	return (
		<SidebarLayout {...rest}>
			<MdxLayout>{children}</MdxLayout>
		</SidebarLayout>
	);
}

export default DocsLayout;