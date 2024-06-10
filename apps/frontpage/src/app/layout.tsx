import { RootLayout, RootLayoutProps, generateStaticParams, getMetadata } from './components/layout-root';

import "@digdir/designsystemet-theme";
import "@digdir/designsystemet-css";

const metadata = getMetadata('Felles datakatalog', 'Felles datakatalog');

export { generateStaticParams, metadata };

const modifiedRootLayout = (props: RootLayoutProps) => (
	<RootLayout bodyClassName="frontpage" { ...props } />
);

export default modifiedRootLayout;