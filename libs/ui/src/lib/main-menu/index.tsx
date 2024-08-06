import { motion } from 'framer-motion';
import { Link, Heading } from '@digdir/designsystemet-react';

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
						<Heading className={styles.sectionHeader} size="xxsmall" level={2}>
							{dictionary.mainMenu.help.heading}
						</Heading>
						<ul>
							{
								data.help.map(item => (
									<li key={item.href}><Link href={item.href}>{item.title}</Link></li>
								))
							}
						</ul>
					</div>
					<div className={styles.linkSet}>
						<Heading className={styles.sectionHeader} size="xxsmall" level={2}>Verktøy</Heading>
						<ul>
							{
								data.tools.map(item => (
									<li key={item.href}><Link href={item.href}>{item.title}</Link></li>
								))
							}
						</ul>
					</div>
					<div className={styles.linkSet}>
						<Heading className={styles.sectionHeader} size="xxsmall" level={2}>Om data.norge.no</Heading>
						<ul>
							{
								data.about.map(item => (
									<li key={item.href}><Link href={item.href}>{item.title}</Link></li>
								))
							}
						</ul>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
}

export default MainMenu;
