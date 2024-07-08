import cn from 'classnames';
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

const LogoLink = ({ className, baseUri, label, ...rest }) => {
	return (
		<Link
      href={baseUri}
      aria-label={label}
      className={cn(styles.logoLink, className)}
      {...rest}
    >
      <Logo />
    </Link>
	);
}

export { Logo, LogoLink, LogoLinkProps };