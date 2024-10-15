import DocsPage, { DocsPageProps, generateMetadata as docsPageMetadata } from '../../components/docs/docs-page';

export function generateMetadata(props: DocsPageProps) {
    return docsPageMetadata({ rootContentDirectory: 'catalogs', ...props });
}

export default async function Page(props: DocsPageProps) {
    return (
        <DocsPage rootContentDirectory="catalogs" { ...props } />
    );
}