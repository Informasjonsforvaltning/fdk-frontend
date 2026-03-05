import React from 'react';
import { Link, Tag, Heading } from '@digdir/designsystemet-react';
import { Chat2Icon } from '@navikt/aksel-icons';
import { type JSONValue } from '@fdk-frontend/types';
import { type LocaleCodes, type Localization } from '@fdk-frontend/localization';
import { Hstack, Subtext, IconBadge, ExternalLink } from '@fdk-frontend/ui';
import styles from '../../community-tab.module.scss';

export type TopicRowProps = {
    communityBaseUri: string;
    topic: JSONValue;
    dictionary: Localization;
    locale: LocaleCodes;
};

const TopicRow = ({
    topic,
    communityBaseUri,
    dictionary,
    ...props
}: TopicRowProps & React.HTMLAttributes<HTMLTableRowElement>) => {
    return (
        <tr {...props}>
            <td width='1'>
                <IconBadge fontSize='1.5rem'>
                    <Chat2Icon aria-hidden />
                </IconBadge>
            </td>
            <td>
                <div className={styles.threadTeaser}>
                    <Heading
                        level={3}
                        data-size='xs'
                    >
                        <ExternalLink
                            href={`${communityBaseUri}/topic/${topic.slug}`}
                            className={styles.threadLink}
                        >
                            {topic.title}
                        </ExternalLink>
                    </Heading>
                    <Hstack style={{ gap: '0.5rem' }}>
                        <Tag
                            data-size='sm'
                            color='neutral'
                        >
                            <Link href={`${communityBaseUri}/category/${topic.category.slug}`}>
                                {topic.category.name}
                            </Link>
                        </Tag>
                        <Subtext>{`${dictionary.community.topicRow.postedBy} ${topic.author.username}`}</Subtext>
                    </Hstack>
                </div>
            </td>
            <td align='right'>
                <Hstack style={{ justifyContent: 'flex-end' }}>
                    <div className={styles.forumStats}>
                        <span>{topic.votes}</span>
                        <Subtext>{dictionary.community.topicRow.votes}</Subtext>
                    </div>
                    <div className={styles.forumStats}>
                        <span>{topic.posts.length}</span>
                        <Subtext>{dictionary.community.topicRow.posts}</Subtext>
                    </div>
                    <div className={styles.forumStats}>
                        <span>{topic.viewcount}</span>
                        <Subtext>{dictionary.community.topicRow.views}</Subtext>
                    </div>
                </Hstack>
            </td>
        </tr>
    );
};

export default TopicRow;
