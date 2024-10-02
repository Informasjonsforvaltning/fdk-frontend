import RootLayout, { RootLayoutProps, generateStaticParams } from '@fdk-frontend/ui/layout-root';

const FrontpageLayout = (props: RootLayoutProps) => <RootLayout frontpage {...props} />;

export default FrontpageLayout;
export { generateStaticParams };
