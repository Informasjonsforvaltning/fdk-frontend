import { LocaleCodes } from '@fdk-frontend/localization';
import DocsPage, { generateMetadata as docsPageMetadata } from '../../components/docs/docs-page';

interface Props {
    params: Promise<{
        lang: LocaleCodes;
    }>;
}

export const generateMetadata = async (props: Props) => {
    return await docsPageMetadata({ rootContentDirectory: 'contact', ...props });
};

export default async function Page(props: Props) {
    return (
        <DocsPage
            rootContentDirectory='contact'
            {...props}
        />
    );
}
