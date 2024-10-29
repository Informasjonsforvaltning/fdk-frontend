import { PropsWithChildren, useState, useEffect } from 'react';
import cn from 'classnames';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import {
    ToggleGroup,
    Heading,
    Spinner,
    Textfield,
    Button
} from '@digdir/designsystemet-react';
import { FilesIcon } from '@navikt/aksel-icons';

import styles from './metadata-page.module.scss';

const MetadataPage = ({ children }: PropsWithChildren) => {

	const [ contentType, setContentType ] = useState('text/turtle');
	const [ source, setSource ] = useState(undefined);
	const [ loading, setLoading ] = useState(false);

	const syntax = {
		'text/turtle': 'turtle',
		'application/rdf+xml': 'xml',
		'application/json': 'json'
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

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading
	                level={4}
	                size='xxsmall'
	            >
	                Metadata
	            </Heading>
	            {loading && <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>Laster...<Spinner size='xs' variant='interaction' /></div>}
	        </div>
			<div className={styles.header}>
				<div className={styles.urlbar}>
					<Button size='sm' variant='secondary'><FilesIcon /></Button>
					<Textfield size='md' readOnly value='https://data.norge.no/datasets/2d1d37c9-6388-3ba7-9a7d-1ae5627a79a8' />
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
				            RDF
				        </ToggleGroup.Item>
				        <ToggleGroup.Item value="application/json">
				            JSON
				        </ToggleGroup.Item>
			    	</ToggleGroup>
		    	</div>
	    	</div>
	    	<div className={cn(styles.content, styles.article)}>
	    		<Button size='sm' variant='secondary'><FilesIcon /></Button>
				<SyntaxHighlighter language={syntax[contentType]} style={vscDarkPlus}>
					{source}
				</SyntaxHighlighter>
	    	</div>
		</div>
	);
}

export default MetadataPage;