import cn from 'classnames';
import RootLayout, { RootLayoutProps, generateStaticParams } from '@fdk-frontend/ui/layout-root';

const metadata = { 
	title: 'data.norge.no - Forside',
	description: 'data.norge.no er Norges offisielle portal for deling av data. Her kan du søke etter og laste ned datasett fra offentlige virksomheter, og bruke dem til å utvikle tjenester, apper, eller drive forskning.'
};

const FrontpageLayout = (props: RootLayoutProps) => (
	<RootLayout { ...props } />
);

export default FrontpageLayout;
export { generateStaticParams, metadata };
