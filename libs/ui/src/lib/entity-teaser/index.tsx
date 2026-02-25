import React from 'react';
import cn from 'classnames';
import { Card, CardBlock, type CardProps, Heading, Link, Paragraph, Tag } from '@digdir/designsystemet-react';
import { TagList } from '@fellesdatakatalog/ui';
import { type SearchObject } from '@fellesdatakatalog/types';
import AccessLevelTag from '../access-level-tag';
import { OrgLogo } from '../org-logo';
import { printLocaleValue } from '@fdk-frontend/utils';
import styles from './styles.module.scss';

export type EntityTeaserProps = {
    entity: SearchObject;
};

const EntityTeaser = ({ entity, className, ...rest }: EntityTeaserProps & Partial<CardProps>) => {
    return (
        <Card
            className={cn(styles.container, className)}
            {...rest}
        >
            <CardBlock>
                <div>
                    <OrgLogo
                        className={styles.orgLogo}
                        orgNr={entity.organization?.id}
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
                    {
                        entity.accessRights?.code &&
                        <AccessLevelTag
                            accessCode={entity.accessRights?.code}
                        />
                    }
                    {/* <Tag
                        data-color='success'
                        data-size='sm'
                    >
                        Allmenn tilgang
                    </Tag> */}
                    {
                        entity.isOpenData &&
                        <Tag
                            data-color='success'
                            data-size='sm'
                        >
                            Åpne data
                        </Tag>
                    }
                </TagList>
                <Paragraph>{printLocaleValue('nb', entity.description)}</Paragraph>
                <Paragraph
                    data-size='sm'
                    className={styles.keywords}
                >
                    {entity.keyword?.join(', ')}
                </Paragraph>
            </CardBlock>
        </Card>
    );
};

export default EntityTeaser;
