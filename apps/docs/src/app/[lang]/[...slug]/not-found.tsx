import type { Metadata } from 'next';

import { Link, Button, Heading } from '@digdir/designsystemet-react';

import styles from './not-found.module.scss';

export default function NotFound() {
    return (
        <div className={styles.notFoundPage}>
            <Heading
                level={1}
                size='medium'
            >
                Page not found :(
            </Heading>
            <p>Could not find requested resource</p>
            <Button
                asChild
                variant='secondary'
                size='small'
            >
                <Link href='/'>Return Home</Link>
            </Button>
        </div>
    );
}

export const metadata: Metadata = {
    title: 'Not found - data.norge.no',
    description: "The page you're looking for doesnt exist",
};
