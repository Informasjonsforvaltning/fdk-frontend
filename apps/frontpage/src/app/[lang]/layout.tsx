import cn from 'classnames';
import { RootLayout, RootLayoutProps, generateStaticParams } from './components/layout-root';

import pageStyles from './page.module.scss';
import headerStyles from './components/header/header.module.scss';

const metadata = { 
	title: 'data.norge.no',
	description: 'Felles datakatalog'
};

const FrontpageLayout = (props: RootLayoutProps) => (
	<RootLayout
		className={cn(
			pageStyles.frontpageBody,
			headerStyles.frontpageWrapper
		)}
		{ ...props }
	/>
);

export default FrontpageLayout;
export { generateStaticParams, metadata };
