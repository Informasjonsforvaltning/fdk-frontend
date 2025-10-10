import React from 'react';
import { Heading } from '@digdir/designsystemet-react';
import { ScrollShadows, PlaceholderBox, DatasetTable } from '@fdk-frontend/ui';
import { DatasetDetailsProps } from '../../';
import styles from '../../details-tab.module.scss';

const RelatedDetails = ({ related, locale, dictionary }: Omit<DatasetDetailsProps, 'dataset'>) => {
    return (
        <section>
            <Heading
                level={2}
                data-size='xs'
            >
                {dictionary.details.related.title}
            </Heading>
            {related && related.length ? (
                <ScrollShadows className={styles.tableScroller}>
                    <DatasetTable
                        datasets={related}
                        locale={locale}
                        dictionary={dictionary}
                    />
                </ScrollShadows>
            ) : (
                <PlaceholderBox>Ikke oppgitt</PlaceholderBox>
            )}
        </section>
    );
};

export default RelatedDetails;
