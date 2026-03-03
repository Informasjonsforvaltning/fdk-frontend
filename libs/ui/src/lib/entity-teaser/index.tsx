import React from 'react';
import cn from 'classnames';
import { Card, CardBlock, type CardProps, Heading, Link, Paragraph, Tag, Skeleton } from '@digdir/designsystemet-react';
import { TagList, VStack, HStack } from '@fellesdatakatalog/ui';
import { AccessRightsCodes, type SearchObject } from '@fellesdatakatalog/types';
import AccessLevelTag from '../access-level-tag';
import { OrgLogo } from '../org-logo';
import OrgButton from '../org-button';
import { printLocaleValue } from '@fdk-frontend/utils';
import styles from './styles.module.scss';
import { getLocalization, type LocaleCodes } from '@fdk-frontend/localization';

export type EntityTeaserProps = {
    entity?: SearchObject;
    locale: LocaleCodes;
};

const EntityTeaser = ({ entity, className, locale, ...rest }: EntityTeaserProps & Partial<CardProps>) => {
    const desc = entity && printLocaleValue(locale, entity.description);
    const localization = getLocalization(locale).common;
    return (
        <Card
            className={cn(styles.container, className)}
            {...rest}
        >
            <CardBlock>
                {
                    entity ?
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
                            title={printLocaleValue(locale, entity.organization?.prefLabel)}
                        />
                        <Heading>
                            <Link href={`datasets/${entity.id}`}>
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
                            <Link href='/datasets'>
                                {localization.entities[entity.searchType]}
                            </Link>
                        </Tag>
                        {
                            entity.accessRights?.code &&
                            <AccessLevelTag
                                data-size='sm'
                                accessCode={entity.accessRights?.code as AccessRightsCodes}
                                nonInteractive
                                locale={locale}
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
                    <Paragraph>
                        {
                            desc ?
                            desc.length > 500 ?
                            `${desc.slice(0, 500)}...` :
                            desc :
                            'Mangler beskrivelse'
                        }
                    </Paragraph>
                }
                {/* <Paragraph
                    data-size='sm'
                    className={styles.keywords}
                >
                    {entity.keyword?.join(', ')}
                </Paragraph> */}
                {
                    entity &&
                    <div className={styles.orgName}>
                        {printLocaleValue(locale, entity.organization?.prefLabel)}
                    </div>
                }
            </CardBlock>
        </Card>
    );
};

export default EntityTeaser;
