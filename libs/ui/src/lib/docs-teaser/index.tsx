import React from 'react';
import cn from 'classnames';
import { Card, CardBlock, type CardProps, Heading, Link, Paragraph, Skeleton } from '@digdir/designsystemet-react';
import styles from './styles.module.scss';
import { getLocalization, type LocaleCodes } from '@fdk-frontend/localization';

export type DocsTeaserProps = {
    locale: LocaleCodes;
    title?: string;
    desc?: string;
    href?: string;
};

const DocsTeaser = ({ className, locale, title, desc, href, ...rest }: DocsTeaserProps & Partial<CardProps>) => {
    const docsTitles = getLocalization(locale).docs?.titles;
    const firstSegment = href?.split('/')[2];
    const sectionTitle =
        firstSegment && docsTitles ? docsTitles[`/${firstSegment}`] : undefined;

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
                            <Link href={href ?? `/${locale}/docs`}>
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
                {
                    href &&
                    <div className={styles.orgName}>
                        {sectionTitle ?? firstSegment}
                    </div>
                }
            </CardBlock>
        </Card>
    );
};

export default DocsTeaser;

