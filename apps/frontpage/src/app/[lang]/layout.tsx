import RootLayout, { generateStaticParams } from '@fdk-frontend/ui/layout-root';

const FrontpageLayout = (props: any) => (
    <RootLayout
        frontpage
        {...props}
    />
);

export default FrontpageLayout;
export { generateStaticParams };
