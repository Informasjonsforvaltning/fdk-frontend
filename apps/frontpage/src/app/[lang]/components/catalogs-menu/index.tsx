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

import CatalogSymbol from '../catalog-symbol/';

import getMainMenuData from '../main-menu/data';

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
					data.catalogs.map((item, i) =>
						<motion.li variants={animations.catalogItem} key={item.key}>
								<Card className={styles.card} asChild href={item.href} isLink>
									<Link href={item.href}>
										<Card.Header>
											<Heading className={styles.catalogTitle} size="xxsmall" level={3}>
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