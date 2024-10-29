import { PropsWithChildren } from 'react';
import cn from 'classnames';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import {
    ToggleGroup,
    Heading,
    Alert
} from '@digdir/designsystemet-react';
import { StarIcon, DownloadIcon, ExternalLinkIcon } from '@navikt/aksel-icons';

import styles from './metadata-page.module.scss';

const MetadataPage = ({ children }: PropsWithChildren) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<Heading
                    level={4}
                    size='xxsmall'
                >
                    Metadata
                </Heading>
				<ToggleGroup
			        defaultValue="turtle"
			        name="toggle-format"
			        size="sm"
			    >
			        <ToggleGroup.Item value="turtle">
			            Turtle
			        </ToggleGroup.Item>
			        <ToggleGroup.Item value="rdf">
			            RDF
			        </ToggleGroup.Item>
			        <ToggleGroup.Item value="json">
			            JSON
			        </ToggleGroup.Item>
		    	</ToggleGroup>
	    	</div>
	    	<div className={cn(styles.content, styles.article)}>
<SyntaxHighlighter language="json" style={vscDarkPlus}>
{`{
  "id": "https://register.geonorge.no/sosi-kodelister/inndelinger/inndelingsbase/kommunenummer/5427",
  "label": "Skjervøy",
  "lang": "no",
  "itemclass": "CodelistValue",
  "uuid": "56d0f814-f25e-48fe-b190-00363e84d020",
  "status": "Tilbaketrukket",
  "description": "Skjervøy",
  "seoname": "skjervøy",
  "owner": "Kartverket",
  "versionNumber": 1,
  "lastUpdated": "2023-01-02T10:03:45.647",
  "dateSubmitted": "2023-01-02T10:03:45.457",
  "codevalue": "5427",
  "ValidFrom": "2020-01-01T00:00:00",
  "ValidTo": "2023-12-31T00:00:00"
}`}
</SyntaxHighlighter>
				{/*<Alert size='sm'>
					Alle ressurssider på data.norge.no støtter <code>Accept</code> headeren
				</Alert>*/}
	    	</div>
		</div>
	);
}

export default MetadataPage;