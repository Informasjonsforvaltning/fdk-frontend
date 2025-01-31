import { PropsWithChildren } from 'react';
import NextLink from 'next/link';

import { Heading, Button, Link, Paragraph, Alert, Tag } from '@digdir/designsystemet-react';
import { ExternalLinkIcon, Chat2Icon } from '@navikt/aksel-icons';

import Badge from '@fdk-frontend/ui/badge';
import HStack from '@fdk-frontend/ui/hstack';
import VStack from '@fdk-frontend/ui/vstack';
import { Subtext } from '@fdk-frontend/ui/typography';
import ScrollShadows from '@fdk-frontend/ui/scroll-shadows';
import IconBadge from '@fdk-frontend/ui/icon-badge';

import styles from './community-tab.module.scss';

const CommunityTab = ({ children }: PropsWithChildren) => {
	return (
		<section className={styles.section}>
			<Heading
				level={4}
				size='xxsmall'
			>
				{/*<Button
					variant='tertiary'
					size='sm'
					style={{float:'right',position:'relative',top:'-0.75rem'}}
				>
					Gå til Datalandsbyen
					<ExternalLinkIcon />
				</Button>*/}
				<HStack>
					Diskusjoner på Datalandsbyen <Badge>2</Badge>
				</HStack>
			</Heading>
			<ScrollShadows className={styles.tableScroller}>
				<table className='table' style={{minWidth:600}}>
					<tbody>
						<tr>
							<td width='1'>
								<IconBadge fontSize='1.5rem'>
									<Chat2Icon />
								</IconBadge>
							</td>
							<td>
								<div className={styles.threadTeaser}>
									<Link href='#' className={styles.threadLink}>Vannverk - transportsystem <ExternalLinkIcon /></Link>
									<HStack style={{gap:'0.5rem'}}>
										<Tag size='sm' color='neutral'><Link href='#'>Kommentartråder</Link></Tag>
										<Subtext>Postet av fdk-community-admin</Subtext>
									</HStack>
								</div>
							</td>
							<td align='right'>
								<HStack style={{justifyContent:'flex-end'}}>
									<div className={styles.forumStats}>
										<span>7</span>
										<Subtext>Stemmer</Subtext>
									</div>
									<div className={styles.forumStats}>
										<span>12</span>
										<Subtext>Innlegg</Subtext>
									</div>
									<div className={styles.forumStats}>
										<span>16k</span>
										<Subtext>Visninger</Subtext>
									</div>
								</HStack>
							</td>
						</tr>
						<tr>
							<td width='1'>
								<IconBadge fontSize='1.5rem'>
									<Chat2Icon />
								</IconBadge>
							</td>
							<td>
								<div className={styles.threadTeaser}>
									<Link href='#' className={styles.threadLink}> Strømstøtten minutt for minutt - beregnet med åpne data  <ExternalLinkIcon /></Link>
									<HStack style={{gap:'0.5rem'}}>
										<Tag size='sm' color='neutral'><Link href='#'>Gode eksempler på bruk</Link></Tag>
										<Subtext>Postet av fdk-community-admin</Subtext>
									</HStack>
								</div>
							</td>
							<td align='right'>
								<HStack style={{justifyContent:'flex-end'}}>
									<div className={styles.forumStats}>
										<span>7</span>
										<Subtext>Stemmer</Subtext>
									</div>
									<div className={styles.forumStats}>
										<span>12</span>
										<Subtext>Innlegg</Subtext>
									</div>
									<div className={styles.forumStats}>
										<span>16k</span>
										<Subtext>Visninger</Subtext>
									</div>
								</HStack>
							</td>
						</tr>
					</tbody>
				</table>
			</ScrollShadows>
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
							<NextLink href="https://datalandsbyen.norge.no/">Gå til Datalandsbyen <ExternalLinkIcon /></NextLink>
						</Button>
						<Button variant='secondary' size='sm' asChild>
							<NextLink href="/docs/community">Mer informasjon</NextLink>
						</Button>
					</HStack>
				</VStack>
			</Alert>
		</section>
	);
}

export default CommunityTab;