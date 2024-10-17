import DocsPage, { generateMetadata as docsPageMetadata } from '../../../components/docs/docs-page';

export const generateMetadata = async (props: any) => {
    return await docsPageMetadata({ rootContentDirectory: 'docs', ...props });
};

export default async function Page(props: any) {
    return (
        <DocsPage
            rootContentDirectory='docs'
            {...props}
        />
    );
}
