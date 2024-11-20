'use client';

import cn from 'classnames';

import { Accordion, Heading, Button, Link, Tag } from '@digdir/designsystemet-react';
import { DownloadIcon, ArrowRightIcon } from '@navikt/aksel-icons';
import Badge from '@fdk-frontend/ui/badge';
import HStack from '@fdk-frontend/ui/hstack';
import PlaceholderBox from '../placeholder-box';

import styles from './distributions.module.scss';
import { SimpleContent, APIContent } from './distribution-content';

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
    apis?: any[];
    className?: string;
};

const Distributions = ({ exampleData = [], datasets, apis = [], className }: DistributionsProps) => {
    return (
        <div className={cn(styles.distributions, className)}>
            <Heading
                level={4}
                size='xxsmall'
            >
                <HStack>
                    <div>Distribusjoner</div>
                    <Badge>{[...datasets, ...exampleData].length}</Badge>
                </HStack>
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
                                            Last ned
                                            {/*Gå til datasett*/}
                                            {/*<ExternalLinkIcon />*/}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Content className={styles.content}>
                            <SimpleContent />
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
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
                                        <Tag
                                            className={styles.tag}
                                            color='success'
                                            size='sm'
                                        >
                                            Eksempeldata
                                        </Tag>
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
                                            Last ned
                                            {/*Gå til datasett*/}
                                            {/*<ExternalLinkIcon />*/}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </Accordion.Header>
                        <Accordion.Content className={styles.content}>
                            <SimpleContent />
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion>
            {/*exampleData && exampleData.length && (
                <>
                    <Heading
                        level={4}
                        size='xxsmall'
                    >
                        <HStack>
                            <div>Eksempeldata</div>
                            <Badge>{exampleData.length}</Badge>
                        </HStack>
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
                                <Accordion.Content className={styles.content}>
                                    <ExampleContent />
                                </Accordion.Content>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </>
            )*/}
            <Heading
                level={4}
                size='xxsmall'
            >
                <HStack>
                    <div>API-er som tilgjengeliggjør dette datasettet</div>
                    <Badge>{apis.length}</Badge>
                </HStack>
            </Heading>
            {
                apis && apis.length ?
                <Accordion border>
                    {apis.map((api, index) => (
                        <Accordion.Item key={api.title}>
                            <Accordion.Header
                                level={3}
                                className={styles.header}
                            >
                                <div className={styles.headerContent}>
                                    <span className={styles.title}>
                                        {api.title}
                                        <div className={styles.tags}>
                                            {api.tags.map((tag: string) => (
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
                                            <Link href='/view/api'>
                                                Gå til API
                                                <ArrowRightIcon fontSize='1.2em' />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Content className={styles.content}>
                                <APIContent api={api} />
                            </Accordion.Content>
                        </Accordion.Item>
                    ))}
                </Accordion> :
                <PlaceholderBox>
                    Ingen registrerte API-er tilgjengeliggjør dette datasettet.
                </PlaceholderBox>
            }
        </div>
    );
};

export default Distributions;
