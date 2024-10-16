import DocsPage, { DocsPageProps, generateMetadata as docsPageMetadata } from '../../components/docs/docs-page';

export const generateMetadata = async (props: DocsPageProps) => {
    return await docsPageMetadata({ rootContentDirectory: 'contact', ...props });
}

export default async function Page(props: DocsPageProps) {
    return (
        <DocsPage rootContentDirectory="contact" { ...props } />
    );
}