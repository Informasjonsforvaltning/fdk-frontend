import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from '@fdk-frontend/ui/copy-button';
import { ToggleGroup, Heading, Spinner, Textfield, HelpText, Paragraph, Link } from '@digdir/designsystemet-react';
import HStack from '@fdk-frontend/ui/hstack';

import styles from './metadata-page.module.scss';

export type MetadataPageProps = {
    uri?: string;
}

const MetadataPage = ({ children, uri, ...props }: MetadataPageProps & React.HTMLAttributes<HTMLDivElement>) => {

    const [contentType, setContentType] = useState<string>('text/turtle');
    const [source, setSource] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const syntax = {
        'text/turtle': 'turtle',
        'application/rdf+xml': 'xml',
        'application/json': 'json',
        'application/ld+json': 'json',
    };

    const getMetadata = async () => {
        setLoading(true);
        try {
            await fetch(uri, {
                headers: { Accept: contentType },
            })
                .then(async (response) => {
                    const responseContentType = response.headers.get('Content-Type');
                    let data = await response.text();

                    if (responseContentType && responseContentType.includes('application/json')) {
                        const jsonData = JSON.parse(data);
                        data = JSON.stringify(jsonData, null, 2); // Format JSON with 2 spaces for indentation
                    }

                    setSource(data);
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };

    useEffect(() => {
        getMetadata();
    }, [contentType]);

    return (
        <div className={styles.wrapper} {...props}>
            <div className={styles.header}>
                <Heading
                    level={4}
                    size='xxsmall'
                >
                    <HStack>
                        Resource Description Framework (RDF)
                        <HelpText
                            title='Begrepsforklaring'
                            size='sm'
                            style={{ transform: 'scale(0.75)' }}
                        >
                            <Paragraph size='sm'>
                                Alle URL-er til ressurser på data.norge.no kan levere RDF-metadata i flere ulike
                                formater, avhengig av hvilken <code>Accept</code> header man sender med.
                                <Link href='/docs/sharing-data/rdf'>
                                    Les mer om RDF og hvilke formater vi støtter her
                                </Link>
                            </Paragraph>
                        </HelpText>
                    </HStack>
                </Heading>
                {loading && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        Laster...
                        <Spinner
                            title='Loading'
                            size='xs'
                            variant='interaction'
                            aria-hidden={true}
                        />
                    </div>
                )}
            </div>
            <div className={styles.header}>
                <div className={styles.urlbar}>
                    <CopyButton copyOnClick={uri} />
                    <Textfield
                        size='md'
                        readOnly
                        value={uri}
                    />
                </div>
                <div className={styles.toolbar}>
                    <ToggleGroup
                        defaultValue={contentType}
                        size='sm'
                        onChange={(value) => setContentType(value)}
                    >
                        <ToggleGroup.Item value='text/turtle'>Turtle</ToggleGroup.Item>
                        <ToggleGroup.Item value='application/rdf+xml'>RDF/XML</ToggleGroup.Item>
                        <ToggleGroup.Item value='application/ld+json'>JSON-LD</ToggleGroup.Item>
                    </ToggleGroup>
                </div>
            </div>
            <div className={cn(styles.content, styles.article)}>
                <CopyButton copyOnClick={source} />
                <SyntaxHighlighter
                    language={syntax[contentType as keyof typeof syntax]}
                    style={vscDarkPlus}
                    showLineNumbers
                >
                    {loading && !source.length ? 'Laster...' : source}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default MetadataPage;
