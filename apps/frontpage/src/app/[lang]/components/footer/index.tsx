import { Dictionary } from '@fdk-frontend/dictionaries';
import { Link, Heading } from '@digdir/designsystemet-react';

import CatalogSymbol from '../catalog-symbol';
import { LogoLink } from '../logo';
import DigdirLogo from './images/digdir-logo';

import getMainMenuData from '../main-menu/data'

import styles from './footer.module.scss';

type FooterProps = {
	dictionary: Dictionary;
	baseUri: string;
}

const Footer = ({ dictionary, baseUri }: FooterProps) => {

	const data = getMainMenuData(dictionary, baseUri);

	return (
		<footer className={styles.footer}>
			<div className={styles.footerLinks}>
				<div className={styles.linkSection}>
					<Heading className={styles.linkSectionHeader} level={3} size="sm">
						{dictionary.mainMenu.catalogs.heading}
					</Heading>
					<ul>
						{
							data.catalogs.map(item => (
								<li>
									<Link href={item.href}>
										<CatalogSymbol
											className={styles.footerCatalogSymbol}
											catalog={item.key}
										/>
										{item.title}
									</Link>
								</li>
							))
						}
					</ul>
				</div>
				<div className={styles.linkSection}>
					<Heading className={styles.linkSectionHeader} level={3} size="sm">
						{dictionary.mainMenu.help.heading}
					</Heading>
					<ul>
						{
							data.help.map(item => (
								<li><Link href={item.href}>{item.title}</Link></li>
							))
						}
					</ul>
				</div>
				<div className={styles.linkSection}>
					<Heading className={styles.linkSectionHeader} level={3} size="sm">
						{dictionary.mainMenu.tools.heading}
					</Heading>
					<ul>
						{
							data.tools.map(item => (
								<li><Link href={item.href}>{item.title}</Link></li>
							))
						}
					</ul>
				</div>
				<div className={styles.linkSection}>
					<Heading className={styles.linkSectionHeader} level={3} size="sm">
						{dictionary.mainMenu.about.heading}
					</Heading>
					<ul>
						{
							data.about.map(item => (
								<li><Link href={item.href}>{item.title}</Link></li>
							))
						}
					</ul>
				</div>
			</div>
			<div className={styles.footerBottom}>
				<LogoLink baseUri={baseUri} />
				<div className={styles.footerDigdirLink}>
					<span>en tjeneste fra</span>
					<Link href="https://www.digdir.no">
						<DigdirLogo />
					</Link>
				</div>
			</div>
		</footer>
	);
}

export default Footer;