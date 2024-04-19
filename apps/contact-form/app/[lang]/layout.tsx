import { RootLayout, generateStaticParams, getMetadata } from '@fdk-frontend/ui/server';

const metadata = getMetadata('Contact Form', 'Contact Form');

export { generateStaticParams, metadata };
export default RootLayout;
