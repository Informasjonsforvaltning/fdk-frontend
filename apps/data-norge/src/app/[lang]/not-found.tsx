import { type Metadata } from 'next';
import { headers } from 'next/headers'
import { i18n, getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { Link, Button, Heading } from '@digdir/designsystemet-react';

import ErrorPage from '../components/error-page';

export default async function NotFound() {
    const dictionary = await getDictionary('en', 'common');
    return (
        <ErrorPage>
            <Heading
                level={1}
                size='medium'
            >
                {dictionary.notFound.title}
            </Heading>
            <p>{dictionary.notFound.message}</p>
            <Button
                asChild
                variant='primary'
                size='small'
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
        description: dictionary.notFound.message
    };
};
