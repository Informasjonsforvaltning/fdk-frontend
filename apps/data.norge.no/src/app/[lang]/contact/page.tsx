import DocsPage, { DocsPageProps, generateMetadata as docsPageMetadata } from '../../components/docs/docs-page';

export function generateMetadata(props: DocsPageProps) {
    return docsPageMetadata({ rootContentDirectory: 'contact', ...props });
}

export default async function Page(props: DocsPageProps) {
    return (
        <DocsPage rootContentDirectory="contact" { ...props } />
    );
}