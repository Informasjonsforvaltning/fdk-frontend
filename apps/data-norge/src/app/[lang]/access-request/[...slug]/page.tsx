import type { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import { Spinner, Paragraph } from '@digdir/designsystemet-react';

export type AccessRequestPageProps = {
    params: Promise<{
        lang: LocaleCodes;
        slug: string[];
    }>;
    searchParams: Promise<any>;
};

const AccessRequestPage = async (props: AccessRequestPageProps) => {

    const { lang, slug } = await props.params;
    const searchParams = await props.searchParams;
    const kind = slug.at(0);
    const id = slug.at(1);
    const { ACCESS_REQUEST_API_HOST } = process.env;

    const url = `${ACCESS_REQUEST_API_HOST}/access-request/${lang}/${kind}/${id}`;

    const response = await fetch(url, { method: 'POST' });
    if (!response.ok) notFound();
    
    const destination = await response.text();
    redirect(destination);

    return (
        <div style={{textAlign:'center'}}>
            <Spinner size='md' variant='interaction' />
            <Paragraph>Videresender...</Paragraph>
        </div>
    );
}

export const metadata: Metadata = {
    title: 'Videresender... - data.norge.no'
};


export default AccessRequestPage;