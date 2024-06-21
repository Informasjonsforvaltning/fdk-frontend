import { RootLayout, RootLayoutProps, generateStaticParams, getMetadata } from './components/layout-root';

const metadata = getMetadata({ 
	title: 'data.norge.no',
	description: 'Felles datakatalog'
});

export { generateStaticParams, metadata };

const modifiedRootLayout = (props: RootLayoutProps) => (
	<RootLayout
		frontpage={true}
		{ ...props }
	/>
);

export default modifiedRootLayout;