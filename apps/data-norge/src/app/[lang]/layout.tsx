import { RootLayout as RootLayoutBase, generateStaticParams } from '@fdk-frontend/ui';

const RootLayout = async ({ children, params }: LayoutProps<'/[lang]'>) => {
    return <RootLayoutBase params={params}>{children}</RootLayoutBase>;
};

export default RootLayout;
export { generateStaticParams };
