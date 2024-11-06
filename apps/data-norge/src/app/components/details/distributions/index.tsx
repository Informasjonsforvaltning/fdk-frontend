'use client';

import cn from 'classnames';

import { Accordion, Heading, Button, Link, Tag } from '@digdir/designsystemet-react';
import { DownloadIcon, ArrowRightIcon } from '@navikt/aksel-icons';

import styles from './distributions.module.scss';
import DistributionContent from './distribution-content';

export type Distribution = {
    title: string;
    tags: string[];
    description: string;
    accessUrl?: string;
    downloadUrl?: string;
};

export type DistributionsProps = {
    datasets: Distribution[];
    exampleData?: Distribution[];
    apis?: Distribution[];
    className?: string;
};

const Distributions = ({ exampleData, datasets, apis, className }: DistributionsProps) => {
    return (
        <div className={cn(styles.distributions, className)}>
            <Heading
                level={4}
                size='xxsmall'
            >
                Datasett
            </Heading>
            <Accordion border>
                {datasets.map((distribution, index) => (
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
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                                            Last ned (5 MB)
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Content className={styles.content}>
                            <DistributionContent />
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion>
            {exampleData && exampleData.length && (
                <>
                    <Heading
                        level={4}
                        size='xxsmall'
                    >
                        Eksempeldata
                    </Heading>
                    <Accordion border>
                        {exampleData.map((distribution, index) => (
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
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                                                    Last ned (150 kB)
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Content className={styles.content}>Beskrivelse her</Accordion.Content>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </>
            )}
            {apis && apis.length && (
                <>
                    <Heading
                        level={4}
                        size='xxsmall'
                    >
                        API-er
                    </Heading>
                    <Accordion border>
                        {apis.map((distribution, index) => (
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
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                                                    Gå til API
                                                    <ArrowRightIcon fontSize='1.2em' />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Content className={styles.content}>Beskrivelse her</Accordion.Content>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </>
            )}
        </div>
    );
};

export default Distributions;
