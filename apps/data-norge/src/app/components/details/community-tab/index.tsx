import { PropsWithChildren } from 'react';

import { Heading, Button, Link, Paragraph, Alert } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

import Badge from '@fdk-frontend/ui/badge';
import HStack from '@fdk-frontend/ui/hstack';
import VStack from '@fdk-frontend/ui/vstack';
import { BrandDivider } from '@fdk-frontend/ui/divider';
import { Subtext } from '@fdk-frontend/ui/typography';

import styles from './community-tab.module.scss';

const CommunityTab = ({ children }: PropsWithChildren) => {
	return (
		<section className={styles.section}>
			<Heading
				level={4}
				size='xxsmall'
			>
				<Button
					variant='tertiary'
					size='sm'
					style={{float:'right',position:'relative',top:'-0.75rem'}}
				>
					Gå til Datalandsbyen
					<ExternalLinkIcon />
				</Button>
				<HStack>
					Diskusjoner på Datalandsbyen <Badge>2</Badge>
					{/*<HelpText
						title='Begrepsforklaring'
						size='sm'
						style={{ transform: 'scale(0.75)' }}
					>
						<Paragraph size='sm'>
							Viser alle diskusjoner på Datalandsbyen hvor denne siden er tagget.
							<Paragraph size='sm'>
								<Link href='https://data.norge.no/specification/dcat-ap-no#Datasett-tilgangsniv%C3%A5'>
									Les mer om Datalandsbyen her
								</Link>
							</Paragraph>
						</Paragraph>
					</HelpText>*/}
				</HStack>
			</Heading>
			<table className='table'>
				<tbody>
					<tr>
						<td>
							<Link href='#'>Datasett Stort testdatasett 1, RAMSUND OG ROGNAN REVISJON <ExternalLinkIcon /></Link>
							<div style={{marginTop:'0.25rem'}}><Subtext>posted by fdk-community-admin</Subtext></div>
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
						<td>
							<Link href='#'>Datasett Stort testdatasett 1, RAMSUND OG ROGNAN REVISJON <ExternalLinkIcon /></Link>
							<div style={{marginTop:'0.25rem'}}><Subtext>posted by fdk-community-admin</Subtext></div>
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
					<HStack>
						<Button variant='secondary' size='sm' asChild>
							<a href="https://datalandsbyen.norge.no/">Gå til Datalandsbyen <ExternalLinkIcon /></a>
						</Button>
						<Button variant='secondary' size='sm' asChild>
							<a href="/docs/community">Mer informasjon</a>
						</Button>
					</HStack>
				</VStack>
			</Alert>
		</section>
	);
}

export default CommunityTab;