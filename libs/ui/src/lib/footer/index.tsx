import { Dictionary } from '@fdk-frontend/dictionaries';
import { Link, Heading } from '@digdir/designsystemet-react';

import { CatalogIcon } from '@fdk-frontend/ui/catalog-symbol';
import { LogoLink } from '@fdk-frontend/ui/logo';
import getMainMenuData from '@fdk-frontend/ui/main-menu/data'
import LanguageSwitcher from '@fdk-frontend/ui/language-switcher'

import DigdirLogo from './images/digdir-logo';
import GithubLogo from './images/github-logo';
import getFooterData from './data'

import styles from './footer.module.scss';

type FooterProps = {
	dictionary: Dictionary;
	baseUri: string;
}

const Footer = ({ dictionary, baseUri }: FooterProps) => {

	const mainMenuData = getMainMenuData(dictionary, baseUri);
	const footerData = getFooterData(dictionary);

	return (
		<footer className={styles.footer}>
			<div className={styles.inner}>
				<div className={styles.links}>
					<div className={styles.linkSection}>
						<Heading className={styles.linkSectionHeader} level={3} size="sm">
							{dictionary.mainMenu.catalogs.heading}
						</Heading>
						<ul>
							{
								mainMenuData.catalogs.map(item => (
									<li>
										<Link className={styles.iconLink} href={item.href}>
											<CatalogIcon catalog={item.key} fontSize='1.5em' />
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
								mainMenuData.help.map(item => (
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
								mainMenuData.tools.map(item => (
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
								mainMenuData.about.map(item => (
									<li><Link href={item.href}>{item.title}</Link></li>
								))
							}
							{
								footerData.policies.map(item => (
									<li><Link href={item.href}>{item.title}</Link></li>
								))
							}
							<li>
								<Link className={styles.iconLink} href={footerData.githubUri}>
									<GithubLogo fontSize='1.25em' />
									{dictionary.footer.githubFollow}
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<LanguageSwitcher inverted />
			</div>
			<div className={styles.bottom}>
				<div className={styles.bottomInner}>
					<LogoLink baseUri={baseUri} />
					<div className={styles.digdirCredit}>
						<span>{dictionary.footer.digdirCredit}</span>
						<Link href={footerData.digdirUri}>
							<DigdirLogo />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
