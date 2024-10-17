import DocsPage, { generateMetadata as docsPageMetadata } from '../../components/docs/docs-page';

export const generateMetadata = async (props: any) => {
    return await docsPageMetadata({ rootContentDirectory: 'contact', ...props });
}

export default async function Page(props: any) {
    return (
        <DocsPage rootContentDirectory="contact" { ...props } />
    );
}