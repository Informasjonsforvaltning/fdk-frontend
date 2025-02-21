import React from 'react';
import cn from 'classnames';
import { Heading, Link } from '@digdir/designsystemet-react';
import ScrollShadows from '@fdk-frontend/ui/scroll-shadows';
import HStack from '@fdk-frontend/ui/hstack';
import AccessLevelTag from '../../../access-level-tag';
import PlaceholderBox from '../../../placeholder-box';
import { DatasetDetailsProps } from '../../';
import { printLocaleValue } from '@fdk-frontend/utils';
import styles from '../../dataset-details.module.scss';

const RelatedDetails = ({ related, locale, dictionary }: { related: any[] } & Omit<DatasetDetailsProps, 'dataset'>) => {
    // console.log(related);
    return (
        <section>
            <Heading
                level={4}
                size='xxsmall'
            >
                {dictionary.details.related.title}
            </Heading>
            {
                related && related.length ?
                <ScrollShadows className={styles.tableScroller}>
                    <table className={cn('table', styles.relatedTable)} style={{minWidth:475}}>
                        <tbody>
                            {
                                related && related.map((dataset: any) => (
                                    <tr key={dataset.id}>
                                        <td>
                                            <Link href={`${dataset.id}`}>
                                                {
                                                    printLocaleValue(locale, dataset.title) ||
                                                    dictionary.realted.namelessDataset
                                                }
                                            </Link>
                                        </td>
                                        <td>
                                            <span className={styles.relatedPublisher}>
                                                {
                                                    dataset.publisher ?
                                                    printLocaleValue(locale, dataset.publisher?.prefLabel) :
                                                    dataset.organization ?
                                                    printLocaleValue(locale, dataset.organization?.prefLabel) :
                                                    `Ukjent virksomhet`
                                                }
                                            </span>
                                        </td>
                                        <td align='right'>
                                            <HStack style={{justifyContent: 'flex-end', gap: '0.5rem'}}>
                                                <AccessLevelTag
                                                    accessCode={dataset.accessRights?.code}
                                                    dictionary={dictionary}
                                                    nonInteractive
                                                />
                                            </HStack>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </ScrollShadows> :
                <PlaceholderBox>Ikke oppgitt</PlaceholderBox>
            }
        </section>
    );
};

export default RelatedDetails;
