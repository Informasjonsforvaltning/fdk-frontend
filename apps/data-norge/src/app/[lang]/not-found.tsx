import { type Metadata } from 'next';
import { Link, Button, Heading } from '@digdir/designsystemet-react';

import ErrorPage from '../components/error-page';

export default async function NotFound() {
    return (
        <ErrorPage>
            <Heading
                level={1}
                size='medium'
            >
                404: Siden ble ikke funnet ☹️
            </Heading>
            <p>Vi klarte dessverre ikke å finne siden du ba om.</p>
            <Button
                asChild
                variant='primary'
                size='small'
            >
                <Link href='/'>Gå til forsiden</Link>
            </Button>
        </ErrorPage>
    );
}

export const metadata: Metadata = {
    title: '404 - data.norge.no',
    description: 'Siden ble ikke funnet',
};
