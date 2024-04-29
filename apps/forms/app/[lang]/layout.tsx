import { RootLayout, generateStaticParams, getMetadata } from '@fdk-frontend/ui/server';

const metadata = getMetadata('Forms', 'Forms');

export { generateStaticParams, metadata };
export default RootLayout;
