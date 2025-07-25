import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyButton, InputWithCopyButton, Hstack } from '@fdk-frontend/ui';
import { type Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { ToggleGroup, Heading, Spinner, HelpText, Paragraph, Link } from '@digdir/designsystemet-react';

import styles from './metadata-tab.module.scss';

export type MetadataTabProps = {
    uri: string;
    dictionary: Dictionary;
    locale: LocaleCodes;
};

const MetadataTab = ({
    children,
    uri,
    dictionary,
    locale,
    ...props
}: MetadataTabProps & React.HTMLAttributes<HTMLDivElement>) => {
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
        <div
            className={styles.wrapper}
            {...props}
        >
            <div className={styles.header}>
                <Heading
                    level={2}
                    size='xxsmall'
                >
                    <Hstack>
                        Resource Description Framework (RDF)
                        <HelpText
                            title={dictionary.rdf.titleHelpTextTitle}
                            size='sm'
                            style={{ transform: 'scale(0.75)' }}
                        >
                            <Paragraph size='sm'>{dictionary.rdf.titleHelpText}</Paragraph>
                            <Paragraph size='sm'>
                                <Link href={`/${locale}/docs/sharing-data/rdf`}>
                                    {dictionary.rdf.titleHelpTextLink}
                                </Link>
                            </Paragraph>
                        </HelpText>
                    </Hstack>
                </Heading>
                {loading && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {`${dictionary.rdf.loading}...`}
                        <Spinner
                            title={dictionary.rdf.loading}
                            size='xs'
                            variant='interaction'
                            aria-hidden={true}
                        />
                    </div>
                )}
            </div>
            <div className={styles.header}>
                <InputWithCopyButton
                    value={uri}
                    inputLabel={dictionary.rdf.inputLabel}
                    copyLabel={dictionary.rdf.copyButton.at(0)}
                    copiedLabel={dictionary.rdf.copyButton.at(1)}
                />
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
                <CopyButton
                    copyLabel={dictionary.rdf.copyButton.at(0)}
                    copiedLabel={dictionary.rdf.copyButton.at(1)}
                    copyOnClick={source}
                />
                <SyntaxHighlighter
                    language={syntax[contentType as keyof typeof syntax]}
                    style={vscDarkPlus}
                    showLineNumbers
                    tabIndex={0}
                >
                    {loading && !source.length ? `${dictionary.rdf.loading}...` : source}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default MetadataTab;
