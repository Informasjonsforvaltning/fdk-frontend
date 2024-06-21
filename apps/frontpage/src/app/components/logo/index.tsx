import { Link } from '@digdir/designsystemet-react';
import DigdirEmblem from './images/digdir-emblem'

import styles from './logo.module.css';

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
	label?: string;
}

const LogoLink = ({ baseUri, label }) => {
	return (
		<Link
          href={baseUri}
          aria-label={label}
          className={styles.logoLink}
        >
          <Logo />
        </Link>
	);
}

export { Logo, LogoLink, LogoLinkProps };