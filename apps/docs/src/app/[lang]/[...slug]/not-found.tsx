import type { Metadata } from 'next';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div>
            <h1>Not Found</h1>
            <p>Could not find requested resource</p>
            <Link href='/'>Return Home</Link>
        </div>
    );
}

export const metadata: Metadata = {
    title: 'Not found - data.norge.no',
    description: "The page you're looking for doesnt exist",
};
