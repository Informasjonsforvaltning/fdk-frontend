import cn from 'classnames';
import { RootLayout, RootLayoutProps, generateStaticParams } from '@fdk-frontend/ui/layout-root';

import headerStyles from '@fdk-frontend/ui/header/header.module.scss';
import pageStyles from './page.module.scss';

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