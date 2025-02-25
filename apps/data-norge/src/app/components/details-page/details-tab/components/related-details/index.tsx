import React from 'react';
import { Heading } from '@digdir/designsystemet-react';
import ScrollShadows from '@fdk-frontend/ui/scroll-shadows';
import PlaceholderBox from '@fdk-frontend/ui/placeholder-box';
import DatasetTable from '@fdk-frontend/ui/dataset-table';
import { DatasetDetailsProps } from '../../';
import styles from '../../details-tab.module.scss';

const RelatedDetails = ({ related, locale, dictionary }: { related: any[] } & Omit<DatasetDetailsProps, 'dataset'>) => {
    return (
        <section>
            <Heading
                level={4}
                size='xxsmall'
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
