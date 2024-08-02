import { RootLayout, RootLayoutProps, generateStaticParams } from './components/layout-root';

const metadata = { 
	title: 'data.norge.no',
	description: 'Felles datakatalog'
};

const modifiedRootLayout = (props: RootLayoutProps) => (
	<RootLayout
		frontpage={true}
		{ ...props }
	/>
);

export default modifiedRootLayout;
export { generateStaticParams, metadata };