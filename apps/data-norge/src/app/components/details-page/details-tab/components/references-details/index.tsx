import React from 'react';
import { Heading, Link } from '@digdir/designsystemet-react';
import ScrollShadows from '@fdk-frontend/ui/scroll-shadows';
import PlaceholderBox from '@fdk-frontend/ui/placeholder-box';
import DatasetTable from '@fdk-frontend/ui/dataset-table';
import DatasetRelationLabel from '@fdk-frontend/ui/dataset-relation-label';
import { printLocaleValue } from '@fdk-frontend/utils';
import { DatasetDetailsProps } from '../../';
import styles from '../../details-tab.module.scss';

const ReferencesDetails = ({ populatedReferences, locale, dictionary }: Omit<DatasetDetailsProps, 'dataset'>) => {

	const relations = populatedReferences.filter(r => r.reference.referenceType.uri !== 'http://purl.org/dc/terms/relation');
	const other = populatedReferences.filter(r => !relations.includes(r));

    return (
        <section>
            <Heading
                level={2}
                size='xxsmall'
            >
                Referanser
            </Heading>
            {populatedReferences && populatedReferences.length ? (
                <dl>
                	{
                		relations.map(r => (
                			<React.Fragment key={r.reference?.source?.uri}>
                				<dt>
                					{
                						dictionary.details.related.relationLabels[r.reference?.referenceType?.uri] ||
                						dictionary.details.related.relationLabels.unknown
                					}:
                				</dt>
                				<dd>
                					{
                						r.resource ?
                						<Link href={`/datasets/${r.resource?.id}`}>
	                						{printLocaleValue(locale, r.resource?.title)}
	                					</Link> :
	                					<Link href={r.reference.source.uri}>
			        						{printLocaleValue(locale, r.reference.source.prefLabel) || r.reference.source.uri}
			        					</Link>
                					}
                				</dd>
                			</React.Fragment>
                		))
                	}
    				<dt>Relaterte ressurser:</dt>
    				<dd>
    					<ol>
        					{
        						other.map(r => (
        							<li key={r.reference?.source?.uri}>
        								{
        									r.resource ?
        									<Link href={r.resource ? `/datasets/${r.resource.id}` : r.reference.source.uri}>
				        						{printLocaleValue(locale, r.resource?.title)}
				        					</Link> :
				        					<Link href={r.reference.source.uri}>
				        						{printLocaleValue(locale, r.reference.source.prefLabel) || r.reference.source.uri}
				        					</Link>
        								}
        							</li>
        						))
        					}
    					</ol>
    				</dd>
                </dl>
            ) : (
                <PlaceholderBox>Ikke oppgitt</PlaceholderBox>
            )}
        </section>
    );
};

export default ReferencesDetails;
