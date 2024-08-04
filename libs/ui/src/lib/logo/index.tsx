import cn from 'classnames';
import { Link } from '@digdir/designsystemet-react';

import DigdirEmblem from './images/digdir-emblem'

import styles from './logo.module.scss';

const Logo = () => {
	return (
		<div className={styles.logo}>
			<DigdirEmblem />
			<span>data.norge.no</span>
		</div>
	);
}

type LogoLinkProps = {
	baseUri?: string;
}

<<<<<<<< HEAD:libs/ui/src/lib/logo/index.tsx
const LogoLink = ({ className, href, ...rest }) => {
	return (
		<Link
      href={href}
========
const LogoLink = ({ className, baseUri, ...rest }) => {
	return (
		<Link
      href={baseUri}
>>>>>>>> 500950c (feat: i18n: all translations done, language-switcher working, footer design done):apps/frontpage/src/app/[lang]/components/logo/index.tsx
      className={cn(styles.logoLink, className)}
      {...rest}
    >
      <Logo />
    </Link>
	);
}

export { Logo, LogoLink, LogoLinkProps };