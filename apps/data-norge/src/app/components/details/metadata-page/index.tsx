import { PropsWithChildren, useState, useEffect } from 'react';
import cn from 'classnames';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import {
    ToggleGroup,
    Heading,
    Spinner,
    Textfield,
    Button,
    HelpText,
    Paragraph,
    Link
} from '@digdir/designsystemet-react';
import { FilesIcon } from '@navikt/aksel-icons';

import HStack from '../hstack';
import CopyButton from '../copy-button';

import styles from './metadata-page.module.scss';

const MetadataPage = ({ children }: PropsWithChildren) => {

	const [ contentType, setContentType ] = useState('text/turtle');
	const [ source, setSource ] = useState(undefined);
	const [ loading, setLoading ] = useState(false);

	const syntax = {
		'text/turtle': 'turtle',
		'application/rdf+xml': 'xml',
		'application/json': 'json',
		'application/ld+json': 'json'
	}

	const getMetadata = async () => {
		setLoading(true);
		try {
			await fetch(`https://data.norge.no/datasets/e4c67aa2-af5a-36c2-b5c2-96b571ddd850`, {
				headers: { 'Accept': contentType }
			})
			.then(async response => {
				const responseContentType = response.headers.get("Content-Type");
				let data = await response.text();

				if (responseContentType && responseContentType.includes("application/json")) {
					const jsonData = JSON.parse(data);
					data = JSON.stringify(jsonData, null, 2); // Format JSON with 2 spaces for indentation
				}

				setSource(data);
			})
			.finally(() => {
				setLoading(false);
			});
		} catch (error) {
			console.error("Error parsing JSON:", error);
		}
	}

	useEffect(() => {
		getMetadata();
	}, [ contentType ]);

	const copyToClipboard = (text) => {
		navigator.clipboard.writeText(text);
	}

	return (
		<div className={styles.wrapper}>
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
	                        	Alle URL-er til ressurser på data.norge.no kan levere RDF-metadata i flere ulike formater, avhengig av hvilken <code>Accept</code> header man sender med.
	                            <Link href="/docs/sharing-data/rdf">Les mer om RDF og hvilke formater vi støtter her</Link>
	                        </Paragraph>
	                    </HelpText>
	                </HStack>
	            </Heading>
	            {loading && <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>Laster...<Spinner size='xs' variant='interaction' /></div>}
	        </div>
			<div className={styles.header}>
				<div className={styles.urlbar}>
					<CopyButton copyOnClick='https://data.norge.no/datasets/85dba4d8-9d40-4c3e-9d8f-9e0544bd390f' />
					<Textfield size='md' readOnly value='https://data.norge.no/datasets/85dba4d8-9d40-4c3e-9d8f-9e0544bd390f' />
				</div>
                <div className={styles.toolbar}>
					<ToggleGroup
				        defaultValue={contentType}
				        name="toggle-format"
				        size="sm"
				        onChange={(value) => setContentType(value)}
				    >
				        <ToggleGroup.Item value="text/turtle">
				            Turtle
				        </ToggleGroup.Item>
				        <ToggleGroup.Item value="application/rdf+xml">
				            RDF/XML
				        </ToggleGroup.Item>
				        <ToggleGroup.Item value="application/ld+json">
				            JSON-LD
				        </ToggleGroup.Item>
			    	</ToggleGroup>
		    	</div>
	    	</div>
	    	<div className={cn(styles.content, styles.article)}>
	    		<CopyButton copyOnClick={source} />
				<SyntaxHighlighter language={syntax[contentType]} style={vscDarkPlus} showLineNumbers>
					{(loading && !source) ? 'Laster...' : source}
				</SyntaxHighlighter>
	    	</div>
		</div>
	);
}

export default MetadataPage;