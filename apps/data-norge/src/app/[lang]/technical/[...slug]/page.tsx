import DocsPage, { generateMetadata as docsPageMetadata } from '../../../components/docs/docs-page';

export const generateMetadata = async (props: any) => {
    return await docsPageMetadata({ rootContentDirectory: 'technical', ...props });
};

export default async function Page(props: any) {
    return (
        <DocsPage
            rootContentDirectory='technical'
            {...props}
        />
    );
}
