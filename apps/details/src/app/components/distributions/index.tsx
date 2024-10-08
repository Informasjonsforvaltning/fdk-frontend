'use client';

import { Heading, Button, Link, Tag, Accordion, Table } from '@digdir/designsystemet-react';
import { DownloadIcon, ExternalLinkIcon } from '@navikt/aksel-icons';

import styles from './distributions.module.scss';

export type Distribution = {
    title: string;
    tags: string[];
    beskrivelse: string;
};

export type DistributionsProps = {
    distributions: Distribution[];
};

const Distributions = ({ distributions }: DistributionsProps) => {
    return (
        <div className={styles.distributions}>
            <Accordion border>
                {distributions.map((distribution) => (
                    <Accordion.Item>
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
                                                size="xs"
                                            >
                                                {tag}
                                            </Tag>
                                        ))}
                                    </div>
                                </span>
                                <Button
                                    asChild
                                    size='sm'
                                    variant='secondary'
                                    color='first'
                                >
                                    <Link href='#'>
                                        <DownloadIcon fontSize='1.2em' />
                                        Last ned
                                    </Link>
                                </Button>
                            </div>
                        </Accordion.Header>
                        <Accordion.Content className={styles.content}>
                            <table>
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
                            </table>
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};

export default Distributions;
