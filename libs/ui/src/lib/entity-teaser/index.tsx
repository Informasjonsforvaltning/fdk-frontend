import React from 'react';
import cn from 'classnames';
import { Card, type CardProps, Heading, Link, Paragraph, Tag } from '@digdir/designsystemet-react';
import { TagList } from '@fellesdatakatalog/ui';
import { type SearchObject } from '@fellesdatakatalog/types';
import AccessLevelTag from '../access-level-tag';
import { OrgLogo } from '../org-logo';
import { printLocaleValue } from '@fdk-frontend/utils';
import styles from './styles.module.scss';

export type EntityTeaserProps = {
    entity: SearchObject;
};

const EntityTeaser = ({ entity, className, ...rest }: EntityTeaserProps & CardProps) => {
    return (
        <Card
            className={cn(styles.container, className)}
            {...rest}
        >
            <Card.Block>
                <div>
                    <OrgLogo
                        className={styles.orgLogo}
                        orgNr={entity.publisher?.id}
                    />
                    <Heading>
                        <Link
                            href='https://designsystemet.no'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            {printLocaleValue('nb', entity.title)}
                        </Link>
                    </Heading>
                </div>
                <TagList>
                    <Tag
                        data-color='info'
                        data-size='sm'
                    >
                        <Link href='/datasets'>{entity.searchType}</Link>
                    </Tag>
                    <Tag
                        data-color='success'
                        data-size='sm'
                    >
                        Allmenn tilgang
                    </Tag>
                    <Tag
                        data-color='success'
                        data-size='sm'
                    >
                        Åpne data
                    </Tag>
                </TagList>
                <Paragraph>{printLocaleValue('nb', entity.description)}</Paragraph>
                <Paragraph
                    data-size='sm'
                    className={styles.keywords}
                >
                    {entity.keyword?.join(', ')}
                </Paragraph>
            </Card.Block>
        </Card>
    );
};

export default EntityTeaser;
