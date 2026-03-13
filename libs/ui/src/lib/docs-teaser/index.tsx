import React from 'react';
import cn from 'classnames';
import { Card, CardBlock, type CardProps, Heading, Link, Paragraph, Tag, Skeleton, Tooltip } from '@digdir/designsystemet-react';
import { TagList, HStack } from '@fellesdatakatalog/ui';
import { AccessRightsCodes, EntityType, type SearchObject } from '@fellesdatakatalog/types';
import AccessLevelTag from '../access-level-tag';
import { OrgLogo } from '../org-logo';
import { printLocaleValue } from '@fdk-frontend/utils';
import styles from './styles.module.scss';
import { getLocalization, type LocaleCodes } from '@fdk-frontend/localization';
import { SparklesFillIcon } from '@navikt/aksel-icons';

export type DocsTeaserProps = {
    locale: LocaleCodes;
    title?: string;
    desc?: string;
};

const DocsTeaser = ({ className, locale, title, desc, ...rest }: DocsTeaserProps & Partial<CardProps>) => {
    const localization = getLocalization(locale).common;
    return (
        <Card
            className={cn(styles.container, className)}
            {...rest}
        >
            <CardBlock>
                {
                    title ?
                    <div>
                        <Heading>
                            <Link href={`/${locale}/docs`}>
                                {title}
                            </Link>
                        </Heading>
                    </div> : 
                    <Heading data-size='sm'>
                        <Skeleton
                            variant='rectangle'
                            height='1.5rem'
                            width='300px'
                        />
                    </Heading>
                }
                {/*
                    entity ?
                    <TagList>
                        <Tag
                            data-color='neutral'
                            data-size='sm'
                        >
                            <Link href={`/${locale}/search/${setFragments[entity.searchType]}`}>
                                {localization.entities[entity.searchType]}
                            </Link>
                        </Tag>
                    </TagList> :
                    <div style={{marginTop:'0.5rem',lineHeight:'1.75rem'}}>
                        <Skeleton
                            variant='text'
                            width={300}
                        />
                    </div>
                */}
                {
                    desc ?
                    <Paragraph className={styles.description}>
                        {
                            desc ?
                            desc.length > 500 ?
                            `${desc.slice(0, 500)}...` :
                            desc :
                            'Mangler beskrivelse'
                        }
                    </Paragraph> :
                    <div style={{marginTop:'0.5rem',lineHeight:'1.75rem'}}>
                        <Skeleton
                            variant='text'
                            width={300}
                        />
                    </div>
                }
            </CardBlock>
        </Card>
    );
};

export default DocsTeaser;

