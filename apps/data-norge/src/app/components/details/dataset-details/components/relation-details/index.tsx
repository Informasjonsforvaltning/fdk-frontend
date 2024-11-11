import { PropsWithChildren, useContext } from 'react';

import { Heading, Link, Tag } from '@digdir/designsystemet-react';

import PlaceholderBox from '../../../placeholder-box';
import { DatasetDetailsContext } from '../..';

const RelationDetails = ({ fields, ...props }: { fields: any } & PropsWithChildren) => {
    const { showEmptyRows } = useContext(DatasetDetailsContext);

    if (!showEmptyRows && fields === null) return false;

    return (
        <section>
            <Heading
                level={4}
                size='xxsmall'
            >
                Relasjoner til datasett
            </Heading>
            {fields !== null ? (
                <dl>
                    <dt>
                        <Link href='#'>Hydrologiske data</Link>
                    </dt>
                    <dd>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Ramsund og rognan revisjon</span>
                            <Tag
                                color='success'
                                size='sm'
                            >
                                Åpne data
                            </Tag>
                        </div>
                    </dd>
                </dl>
            ) : (
                <PlaceholderBox>Ingen relasjoner til datasett oppgitt</PlaceholderBox>
            )}
        </section>
    );
};

export default RelationDetails;
