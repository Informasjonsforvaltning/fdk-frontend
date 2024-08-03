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

import { Dictionary } from '@fdk-frontend/dictionaries';

import styles from './main-menu.module.scss';

import CatalogsMenu from '../catalogs-menu';
import getMainMenuData from './data'

type MainMenuProps = {
	dictionary: Dictionary;
	baseUri: string;
}

const MainMenu = ({ dictionary, baseUri }: MainMenuProps) => {

	const data = getMainMenuData(dictionary, baseUri);

	const animations = {
		menu: {
			hidden: { height: 0 },
			show: { height: 'auto', transition: { duration: 0.15 } }
		},
		links: {
			hidden: { opacity: 0, scale: 0.9 },
			show: { opacity: 1, scale: 1, transition: { delay: 0.05 } }
		}
	}

	return (
		<motion.div
			className={styles.mainMenu}
			variants={animations.menu}
			initial="hidden"
			animate="show"
		>
			<CatalogsMenu
				dictionary={dictionary}
				baseUri={baseUri}
			/>
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