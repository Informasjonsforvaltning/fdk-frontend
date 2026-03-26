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

export type EntityTeaserProps = {
    locale: LocaleCodes;
    entity?: SearchObject;
    llm?: boolean;
};

const setFragments: Record<EntityType, string> = {
    [EntityType.DATASET]: 'datasets',
    [EntityType.DATA_SERVICE]: 'apis',
    [EntityType.CONCEPT]: 'concepts',
    [EntityType.INFORMATION_MODEL]: 'information-models',
    [EntityType.PUBLIC_SERVICE]: 'services-and-events',
    [EntityType.EVENT]: 'services-and-events',
};

const EntityTeaser = ({ entity, className, locale, llm, ...rest }: EntityTeaserProps & Partial<CardProps>) => {
    const desc = entity && printLocaleValue(locale, entity.description);
    const localization = getLocalization(locale).common;
    return (
        <Card
            className={cn(styles.container, className, {[styles.llm]: llm})}
            {...rest}
        >
            <CardBlock>
                {
                    entity ?
                    <div>
                        <OrgLogo
                            className={styles.orgLogo}
                            orgNr={entity.organization?.id}
                            title={printLocaleValue(locale, entity.organization?.prefLabel)}
                        />
                        <Heading>
                            <Link href={`/${locale}/${setFragments[entity.searchType]}/${entity.id}`}>
                                {printLocaleValue(locale, entity.title)}
                            </Link>
                        </Heading>
                    </div> : 
                    <HStack>
                        <Skeleton
                            width='1.5rem'
                            height='1.5rem'
                            variant='circle'
                        />
                        <Heading data-size='sm'>
                            <Skeleton
                                variant='rectangle'
                                height='1.5rem'
                                width='300px'
                            />
                        </Heading>
                    </HStack>
                }
                {
                    entity ?
                    <TagList>
                        <Tag
                            data-color='info'
                            data-size='sm'
                        >
                            <Link href={`/${locale}/search/${setFragments[entity.searchType]}`}>
                                {localization.entities[entity.searchType]}
                            </Link>
                        </Tag>
                        {
                            (entity.searchType === 'DATASET' || entity.searchType === 'DATA_SERVICE') &&
                            <AccessLevelTag
                                data-size='sm'
                                accessCode={entity.accessRights?.code as AccessRightsCodes}
                                nonInteractive
                                locale={locale}
                            />
                        }
                        {
                            entity.isOpenData &&
                            <Tag
                                data-color='success'
                                data-size='sm'
                            >
                                Åpne data
                            </Tag>
                        }
                    </TagList> :
                    <div style={{marginTop:'0.5rem',lineHeight:'1.75rem'}}>
                        <Skeleton
                            variant='text'
                            width={300}
                        />
                    </div>
                }
                {
                    entity &&
                    <Paragraph className={styles.description}>
                        {
                            desc ?
                            desc.length > 500 ?
                            `${desc.slice(0, 500)}...` :
                            desc :
                            'Mangler beskrivelse'
                        }
                    </Paragraph>
                }
                {
                    entity &&
                    <div className={styles.orgName}>
                        {printLocaleValue(locale, entity.organization?.prefLabel)}
                    </div>
                }
                {
                    (entity && llm) &&
                    <Tooltip content='Treff fra KI-søk' placement='top'>
                        <SparklesFillIcon className={styles.llmIcon} />
                    </Tooltip>
                }
            </CardBlock>
        </Card>
    );
};

export default EntityTeaser;
