import { motion } from 'framer-motion';
import { Link, Heading, Card, Paragraph } from '@digdir/designsystemet-react';
import {
	FilesIcon,
	CodeIcon,
	ChatElipsisIcon,
	TenancyIcon,
	CompassIcon,
	SparklesIcon,
	ExternalLinkIcon
} from '@navikt/aksel-icons';

import styles from './main-menu.module.scss';

import { CatalogSymbol } from '../catalog-symbol/';

const catalogItems = [
  {
  	icon: FilesIcon,
  	key: 'datasets',
    title: "Datasett",
    description: "Kolleksjoner av strukturert data som kan lastes ned eller aksesseres via APIer",
    href: "https://staging.fellesdatakatalog.digdir.no/om-datasettkatalogen"
  },
  {
  	icon: CodeIcon,
  	key: 'apis',
    title: "API",
    description: "Protokoller for å kommunisere med datasystemer med dynamisk data og data i sanntid",
    href: "https://staging.fellesdatakatalog.digdir.no/om-api-katalogen"
  },
  {
  	icon: ChatElipsisIcon,
  	key: 'terms',
    title: "Begrep",
    description: "Definisjoner og ordbøker på offisielle termer og begreper som virksomheter bruker i sine data",
    href: "https://staging.fellesdatakatalog.digdir.no/om-begrepskatalogen"
  },
  {
  	icon: TenancyIcon,
  	key: 'information-models',
    title: "Informasjonsmodeller",
    description: "Strukturerte representasjoner av informasjon og data for datasett og APIer",
    href: "https://staging.fellesdatakatalog.digdir.no/om-informasjonskatalogen"
  },
  {
  	icon: CompassIcon,
  	key: 'services-events',
    title: "Tjenester og hendelser",
    description: "Oversikt over tjenester, prosesser og hendelser som virksomheter bruker når de behandler data",
    href: "#"
  },
  {
  	icon: SparklesIcon,
  	key: 'ai',
    title: "Kunstig intelligens",
    description: "Oversikt over KI-prosjekter i offentlig sektor",
    href: "https://staging.fellesdatakatalog.digdir.no/kunstig-intelligens"
  }
];

const MainMenu = () => {

	const animations = {
		menu: {
			hidden: { height: 0 },
			show: { height: 'auto', transition: { duration: 0.15 } }
		},
		links: {
			hidden: { opacity: 0, scale: 0.9 },
			show: { opacity: 1, scale: 1, transition: { delay: 0.05 } }
		},
		catalogList: {
			hidden: { opacity: 0 },
		  show: {
		    opacity: 1,
		    transition: {
		      staggerChildren: 0.05
		    }
		  }
		},
		catalogItem: {
		  hidden: { opacity: 0, scale: 0.9 },
		  show: { opacity: 1, scale: 1 }
		}
	}

	return (
		<motion.div
			className={styles.mainMenu}
			variants={animations.menu}
			initial="hidden"
			animate="show"
		>
			<div className={styles.catalogsSection}>
				<Heading className={styles.sectionHeader} size="xxsmall" level={2}>Datakataloger</Heading>
				<motion.ul
			    variants={animations.catalogList}
			    initial="hidden"
			    animate="show"
			  >
					{
						catalogItems.map((item, i) =>
							<motion.li variants={animations.catalogItem} key={item.key}>
									<Card className={styles.card} asChild href={item.href} isLink>
										<Link href={item.href}>
											<Card.Header>
												<Heading className={styles.catalogTitle} size="xxsmall" level={3}>
													{/*<item.icon aria-hidden fontSize="1.5rem" />*/}
													<CatalogSymbol className={styles.catalogIcon} catalog={item.key} />
													<span>{item.title}</span>
												</Heading>
											</Card.Header>
											<Card.Content>
												<Paragraph size="small">
													{item.description}
												</Paragraph>
											</Card.Content>
										</Link>
									</Card>
							</motion.li>
						)
					}
				</motion.ul>
			</div>
			<div className={styles.linkSectionContainer}>
				<motion.div
					className={styles.linkSection}
					variants={animations.links}
					initial="hidden"
					animate="show"
				>
					<div className={styles.linkSet}>
						<Heading className={styles.sectionHeader} size="xxsmall" level={2}>Hjelp og veiledning</Heading>
						<ul>
							<li><Link href="https://staging.fellesdatakatalog.digdir.no/guidance">Kom i gang</Link></li>
							<li><Link href="https://informasjonsforvaltning.github.io/">Dokumentasjon</Link></li>
							<li><Link href="https://datalandsbyen.norge.no/">Datalandsbyen <ExternalLinkIcon aria-hidden fontSize="1em" /></Link></li>
						</ul>
					</div>
					<div className={styles.linkSet}>
						<Heading className={styles.sectionHeader} size="xxsmall" level={2}>Verktøy</Heading>
						<ul>
							<li><Link href="https://staging.fellesdatakatalog.digdir.no/organizations">Virksomhets&shy;register</Link></li>
							<li><Link href="https://staging.fellesdatakatalog.digdir.no/requests">Etterspør data</Link></li>
							<li><Link href="https://staging.fellesdatakatalog.digdir.no/forms/en/data-hunter">Datajegeren</Link></li>
							<li><Link href="https://staging.fellesdatakatalog.digdir.no/sparql">SPARQL sandbox</Link></li>
						</ul>
					</div>
					<div className={styles.linkSet}>
						<Heading className={styles.sectionHeader} size="xxsmall" level={2}>Om data.norge.no</Heading>
						<ul>
							<li><Link href="https://staging.fellesdatakatalog.digdir.no/reports">Rapporter og nøkkeltall</Link></li>
							<li><Link href="https://staging.fellesdatakatalog.digdir.no/about">Om oss</Link></li>
							<li><Link href="#">Kontakt oss</Link></li>
						</ul>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
}

export { MainMenu };