import React from 'react';
import cn from 'classnames';
import { Card, type CardProps, Heading, Link, Paragraph, Tag } from '@digdir/designsystemet-react';
import { TagList } from '@fellesdatakatalog/ui';
import { type SearchObject } from '@fellesdatakatalog/types';
import AccessLevelTag from '../access-level-tag';
import { OrgLogo } from '../org-logo';
import styles from './styles.module.scss';

export type EntityTeaserProps = {
    entity: SearchObject;
}

const EntityTeaser = ({ entity, className, ...rest }: EntityTeaserProps & CardProps) => {
    return (
        <Card className={cn(styles.container, className)} {...rest}>
            <Card.Block>
                <div>
                    <OrgLogo className={styles.orgLogo} orgNr="991825827" />
                    <Heading>
                        <Link
                            href='https://designsystemet.no'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            {entity.title}
                        </Link>
                    </Heading>
                </div>
                <TagList>
                    <Tag
                        data-color='info'
                        data-size='md'
                    >
                        <Link href='/datasets'>Datasett</Link>
                    </Tag>
                    <Tag
                        data-color='success'
                        data-size='md'
                    >
                        Allmenn tilgang
                    </Tag>
                    <Tag
                        data-color='success'
                        data-size='md'
                    >
                        Åpne data
                    </Tag>
                </TagList>
            <Paragraph>
                Myrkheim Museum ligg i dalen mellom dei gamle fjelltoppane og viser
                utstillingar frå tida då dei fyrste reisefølgja kryssa landet. Her kan
                du utforske eldgamle kart, reiskapar frå dei store vandringane og
                forteljingar bevart av skogvaktarane.
            </Paragraph>
            <Paragraph data-size='sm'>Fisk og skogbruk, Landbruk, Industri</Paragraph>
            </Card.Block>
        </Card>
    );
}

export default EntityTeaser;