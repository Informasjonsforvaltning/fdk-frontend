import { Heading, Button, Link, Paragraph, Alert } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { type JSONValue } from '@fdk-frontend/types';
import Badge from '@fdk-frontend/ui/badge';
import HStack from '@fdk-frontend/ui/hstack';
import VStack from '@fdk-frontend/ui/vstack';
import ScrollShadows from '@fdk-frontend/ui/scroll-shadows';
import PlaceholderBox from '../placeholder-box/';
import styles from './community-tab.module.scss';
import TopicRow from './components/topic-row';

export type CommunityTabProps = {
	communityBaseUri: string;
	topics?: JSONValue;
}

const CommunityTab = ({ communityBaseUri, topics }: CommunityTabProps) => {
	return (
		<section className={styles.section}>
			<Heading
				level={4}
				size='xxsmall'
				className={styles.heading}
			>
				<HStack>
					Diskusjoner på Datalandsbyen <Badge>{topics.length}</Badge>
				</HStack>
				{/*<Button
					variant='tertiary'
					size='sm'
					asChild
				>
					<Link href={communityBaseUri}>
						Gå til Datalandsbyen
						<ExternalLinkIcon />
					</Link>
				</Button>*/}
			</Heading>
			{
				topics.length ?
				<ScrollShadows className={styles.tableScroller}>
					<table className='table' style={{minWidth:600}}>
						<tbody>
							{topics.map((topic: any) => <TopicRow key={topic.tid} topic={topic} communityBaseUri={communityBaseUri} />)}
						</tbody>
					</table>
				</ScrollShadows> :
				<PlaceholderBox>Ingen diskusjoner funnet</PlaceholderBox>
			}
			<Alert className={styles.notice}>
				<VStack>
					<Heading
						level={4}
						size='xxsmall'
					>
						Hva er Datalandsbyen?
					</Heading>
					<Paragraph size='sm'>
						Datalandsbyen er vårt nettforum hvor du kan etterspørre data, dele erfaringer og spørre om råd som gjelder datadeling og informasjonsforvaltning.
					</Paragraph>
					<HStack className={styles.toolbar}>
						<Button variant='secondary' size='sm' asChild>
							<Link href={communityBaseUri}>Gå til Datalandsbyen <ExternalLinkIcon /></Link>
						</Button>
						<Button variant='secondary' size='sm' asChild>
							<Link href="/docs/community">Mer informasjon</Link>
						</Button>
					</HStack>
				</VStack>
			</Alert>
		</section>
	);
}

export default CommunityTab;