import { PropsWithChildren } from 'react';
import cn from 'classnames';

import { Link, type LinkProps } from '@digdir/designsystemet-react';
import { ChevronRightIcon } from '@navikt/aksel-icons';

import styles from './link-panel.module.scss';

const LinkPanel = ({ children, className, ...props }: LinkProps) => {
	return (
		<Link className={cn(styles.linkPanel, className)} { ...props }>
			{children}
			<ChevronRightIcon className={styles.arrow} />
		</Link>
	);
}

export default LinkPanel;