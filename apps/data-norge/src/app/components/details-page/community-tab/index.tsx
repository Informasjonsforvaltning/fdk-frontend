import cn from 'classnames';
import { Heading, Button, Link, Paragraph, Alert } from '@digdir/designsystemet-react';
import { type JSONValue } from '@fdk-frontend/types';
import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import Badge from '@fdk-frontend/ui/badge';
import ExternalLink from '@fdk-frontend/ui/external-link';
import HStack from '@fdk-frontend/ui/hstack';
import VStack from '@fdk-frontend/ui/vstack';
import ScrollShadows from '@fdk-frontend/ui/scroll-shadows';
import PlaceholderBox from '@fdk-frontend/ui/placeholder-box/';
import styles from './community-tab.module.scss';
import TopicRow from './components/topic-row';

export type CommunityTabProps = {
    communityBaseUri: string;
    topics?: JSONValue;
    dictionary: Dictionary;
    locale: LocaleCodes;
};

const CommunityTab = ({ communityBaseUri, topics, dictionary, locale }: CommunityTabProps) => {
    return (
        <section className={styles.section}>
            <Heading
                level={2}
                size='xxsmall'
                className={styles.heading}
            >
                <HStack>
                    {dictionary.community.title}
                    <Badge>{topics.length}</Badge>
                </HStack>
            </Heading>
            {topics.length ? (
                <ScrollShadows className={styles.tableScroller}>
                    <table
                        className={cn('table table--borderless', styles.table)}
                        style={{ minWidth: 600 }}
                    >
                        <tbody>
                            {topics.map((topic: any) => (
                                <TopicRow
                                    key={topic.tid}
                                    topic={topic}
                                    communityBaseUri={communityBaseUri}
                                    dictionary={dictionary}
                                    locale={locale}
                                />
                            ))}
                        </tbody>
                    </table>
                </ScrollShadows>
            ) : (
                <PlaceholderBox>{dictionary.community.noData}</PlaceholderBox>
            )}
            <Alert className={styles.notice}>
                <VStack>
                    <Heading
                        level={2}
                        size='xxsmall'
                    >
                        {dictionary.community.notice.title}
                    </Heading>
                    <Paragraph size='sm'>{dictionary.community.notice.body}</Paragraph>
                    <HStack className={styles.toolbar}>
                        <Button
                            variant='secondary'
                            size='sm'
                            asChild
                        >
                            <ExternalLink
                                href={communityBaseUri}
                                locale={locale}
                            >
                                {dictionary.community.notice.gotoLink}
                            </ExternalLink>
                        </Button>
                        <Button
                            variant='tertiary'
                            size='sm'
                            asChild
                        >
                            <Link href='/docs/community'>{dictionary.community.notice.moreInfo}</Link>
                        </Button>
                    </HStack>
                </VStack>
            </Alert>
        </section>
    );
};

export default CommunityTab;
