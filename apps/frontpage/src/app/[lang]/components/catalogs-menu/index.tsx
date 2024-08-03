'use client';

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

import styles from './catalogs-menu.module.scss';

import { CatalogSymbol } from '../catalog-symbol/';

import getMainMenuData from '../main-menu/data';

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

// const getCatalogIcon = (catalog) => {

// }

type CatalogsMenuProps = {
	dictionary: Dictionary;
	baseUri: string;
}

const CatalogsMenu = ({ dictionary, baseUri }: CatalogsMenuProps) => {

	const data = getMainMenuData(dictionary, baseUri);

	const animations = {
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
	};

	return (
		<div className={styles.catalogsMenu}>
			<motion.ul
		    variants={animations.catalogList}
		    initial="hidden"
		    animate="show"
		  >
				{
					data.catalogs.items.map((item, i) =>
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
	);

}

export default CatalogsMenu;