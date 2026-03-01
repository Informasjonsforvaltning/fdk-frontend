import React from 'react';
import cn from 'classnames';
import { Card, CardBlock, type CardProps, Heading, Link, Paragraph, Tag } from '@digdir/designsystemet-react';
import { TagList } from '@fellesdatakatalog/ui';
import { type SearchObject } from '@fellesdatakatalog/types';
import AccessLevelTag from '../access-level-tag';
import { OrgLogo } from '../org-logo';
import OrgButton from '../org-button';
import { printLocaleValue } from '@fdk-frontend/utils';
import styles from './styles.module.scss';
import { getLocalization, type LocaleCodes } from '@fdk-frontend/localization';

export type EntityTeaserProps = {
    entity: SearchObject;
    locale: LocaleCodes;
};

const EntityTeaser = ({ entity, className, ...rest }: EntityTeaserProps & Partial<CardProps>) => {
    const desc = printLocaleValue('nb', entity.description);
    const localization = getLocalization('nb').common;
    return (
        <Card
            className={cn(styles.container, className)}
            {...rest}
        >
            <CardBlock>
                <div>
                    {/* <OrgButton
                        className={styles.orgButton}
                        orgNr={entity.organization?.id}
                        reverse
                    >
                        {printLocaleValue('nb', entity.organization?.prefLabel)}
                    </OrgButton> */}
                    {/* <div className={styles.orgName}>
                        {printLocaleValue('nb', entity.organization?.prefLabel)}
                    </div> */}
                    <OrgLogo
                        className={styles.orgLogo}
                        orgNr={entity.organization?.id}
                        title={printLocaleValue('nb', entity.organization?.prefLabel)}
                    />
                    <Heading>
                        <Link href={`datasets/${entity.id}`}>
                            {printLocaleValue('nb', entity.title)}
                        </Link>
                    </Heading>
                </div>
                <TagList>
                    <Tag
                        data-color='info'
                        data-size='sm'
                    >
                        <Link href='/datasets'>
                            {localization.entities[entity.searchType]}
                        </Link>
                    </Tag>
                    {
                        entity.accessRights?.code &&
                        <AccessLevelTag
                            data-size='sm'
                            accessCode={entity.accessRights?.code}
                            nonInteractive
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
                <Paragraph>
                    {
                        desc.length > 500 ?
                        `${desc.slice(0, 500)}...` :
                        desc
                    }
                </Paragraph>
                {/* <Paragraph
                    data-size='sm'
                    className={styles.keywords}
                >
                    {entity.keyword?.join(', ')}
                </Paragraph> */}
                <div className={styles.orgName}>
                    {printLocaleValue('nb', entity.organization?.prefLabel)}
                </div>
            </CardBlock>
        </Card>
    );
};

export default EntityTeaser;
