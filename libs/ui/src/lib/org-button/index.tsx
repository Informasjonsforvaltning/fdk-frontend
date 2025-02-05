import React from 'react';
import { Buildings3Icon } from '@navikt/aksel-icons';
import { Button, type ButtonProps, Link } from '@digdir/designsystemet-react';
import styles from './org-button.module.scss';

export type OrgButtonProps = {
	orgLogoSrc?: string;
	href?: string;
}

const OrgButton = ({ children, href, orgLogoSrc, ...props }: OrgButtonProps & ButtonProps) => {
	return (
		<Button
			asChild
			size="sm"
			variant="tertiary"
			className={styles.wrapper}
			{...props}
		>
			<Link href={href}>
				<div className={styles.avatar}>
					{
						orgLogoSrc ?
						<img src={orgLogoSrc} alt="" /> :
						<Buildings3Icon />
					}
				</div>
				{children}
			</Link>
		</Button>
	);
}

export default OrgButton;