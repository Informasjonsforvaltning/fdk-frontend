import DocsPage, { generateMetadata as docsPageMetadata } from '../../components/docs/docs-page';

export const generateMetadata = async (props: any) => {
    return await docsPageMetadata({ rootContentDirectory: 'about', ...props });
};

export default async function Page(props: any) {
    return (
        <DocsPage
            {...props}
            rootContentDirectory='about'
        />
    );
}
