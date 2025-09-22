import { getDictionary } from '@fdk-frontend/dictionaries';
import { Link, Button, Heading } from '@digdir/designsystemet-react';

import ErrorPage from '../components/error-page';

export default async function NotFound() {
    const dictionary = await getDictionary('en', 'common');
    return (
        <ErrorPage>
            <Heading
                level={1}
                data-size='md'
            >
                {dictionary.notFound.title}
            </Heading>
            <p>{dictionary.notFound.message}</p>
            <Button
                asChild
                variant='primary'
                data-size='sm'
            >
                <Link href='/'>{dictionary.notFound.button}</Link>
            </Button>
        </ErrorPage>
    );
}

export const generateMetadata = async () => {
    const dictionary = await getDictionary('en', 'common');
    return {
        title: `${dictionary.notFound.title} - data.norge.no`,
        description: dictionary.notFound.message,
    };
};
