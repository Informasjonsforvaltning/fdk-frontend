'use client';

import cn from 'classnames';
import { Button, Link, Tag, Accordion } from '@digdir/designsystemet-react';
import { DownloadIcon, ExternalLinkIcon } from '@navikt/aksel-icons';

import styles from './distributions.module.scss';

export type Distribution = {
    title: string;
    tags: string[];
    description: string;
    accessUrl?: string;
    downloadUrl?: string;
};

export type DistributionsProps = {
    distributions: Distribution[];
};

const Distributions = ({ distributions }: DistributionsProps) => {
    return (
        <div className={cn(styles.distributions, styles.highlight)}>
            <Accordion border>
                {distributions.map((distribution) => (
                    <Accordion.Item key={distribution.title}>
                        <Accordion.Header
                            level={3}
                            className={styles.header}
                        >
                            <div className={styles.headerContent}>
                                <span className={styles.title}>
                                    {distribution.title}
                                    <div className={styles.tags}>
                                        {distribution.tags.map((tag) => (
                                            <Tag
                                                className={styles.tag}
                                                color='info'
                                                size='sm'
                                                key={tag}
                                            >
                                                {tag}
                                            </Tag>
                                        ))}
                                    </div>
                                </span>
                                <div>
                                    {/*<Button
                                        asChild
                                        size='sm'
                                        variant='secondary'
                                        color='first'
                                        onClick={(e) => { e.stopPropagation() }}
                                    >
                                        <Link href='#'>
                                            Forhåndsvisning
                                        </Link>
                                    </Button>*/}
                                    <Button
                                        asChild
                                        size='sm'
                                        variant='secondary'
                                        color='first'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        <Link href='#'>
                                            <DownloadIcon fontSize='1.2em' />
                                            Last ned
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Content className={styles.content}>
                            <dl>
                                <dt>Beskrivelse</dt>
                                <dd>{distribution.description}</dd>
                                {/*<dt>Få tilgang til datasettet:</dt>
                                <dd>
                                    <Link href={distribution.accessUrl}>
                                        {distribution.accessUrl}
                                    </Link>
                                </dd>
                                <dt>Direkte nedlastingslenke:</dt>
                                <dd>
                                    <Link href={distribution.downloadUrl}>
                                        {distribution.downloadUrl}
                                    </Link>
                                </dd>*/}
                                <dt>Lisens</dt>
                                <dd>
                                    <Link href='http://publications.europa.eu/resource/authority/licence/NLOD_2_0'>
                                        Norsk lisens for offentlige data
                                        <ExternalLinkIcon />
                                    </Link>
                                </dd>
                            </dl>
                            {/*<table>
                                <tbody>
                                    <tr>
                                        <th>Beskrivelse:</th>
                                        <td>{distribution.description}</td>
                                    </tr>
                                    <tr>
                                        <th>Lisens:</th>
                                        <td>
                                            <Link href='http://publications.europa.eu/resource/authority/licence/NLOD_2_0'>
                                                Norsk lisens for offentlige data<ExternalLinkIcon />
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>*/}
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};

export default Distributions;
