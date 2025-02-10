import React from 'react';
import { Link, Tag } from '@digdir/designsystemet-react';
import { ExternalLinkIcon, Chat2Icon } from '@navikt/aksel-icons';
import { type JSONValue } from '@fdk-frontend/types';
import HStack from '@fdk-frontend/ui/hstack';
import { Subtext } from '@fdk-frontend/ui/typography';
import IconBadge from '@fdk-frontend/ui/icon-badge';
import styles from '../../community-tab.module.scss';

export type TopicRowProps = {
	communityBaseUri: string;
	topic: JSONValue;
}

const TopicRow = ({ topic, communityBaseUri, ...props }: TopicRowProps & React.HTMLAttributes<HTMLTableRowElement>) => {
	return (
		<tr {...props}>
			<td width='1'>
				<IconBadge fontSize='1.5rem'>
					<Chat2Icon />
				</IconBadge>
			</td>
			<td>
				<div className={styles.threadTeaser}>
					<Link
						href={`${communityBaseUri}/topic/${topic.slug}`}
						className={styles.threadLink}
					>
						{topic.title} <ExternalLinkIcon />
					</Link>
					<HStack style={{gap:'0.5rem'}}>
						<Tag size='sm' color='neutral'>
							<Link href={`${communityBaseUri}/category/${topic.category.slug}`}>
								{topic.category.name}
							</Link>
						</Tag>
						<Subtext>{`Postet av ${topic.author.username}`}</Subtext>
					</HStack>
				</div>
			</td>
			<td align='right'>
				<HStack style={{justifyContent:'flex-end'}}>
					<div className={styles.forumStats}>
						<span>{topic.votes}</span>
						<Subtext>Stemmer</Subtext>
					</div>
					<div className={styles.forumStats}>
						<span>{topic.posts.length}</span>
						<Subtext>Innlegg</Subtext>
					</div>
					<div className={styles.forumStats}>
						<span>{topic.viewcount}</span>
						<Subtext>Visninger</Subtext>
					</div>
				</HStack>
			</td>
		</tr>
	);
}

export default TopicRow;