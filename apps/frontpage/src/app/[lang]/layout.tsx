import cn from 'classnames';
import RootLayout, { RootLayoutProps, generateStaticParams } from '@fdk-frontend/ui/layout-root';

const metadata = { 
	title: 'data.norge.no',
	description: 'Felles datakatalog'
};

const FrontpageLayout = (props: RootLayoutProps) => (
	<RootLayout { ...props } />
);

export default FrontpageLayout;
export { generateStaticParams, metadata };