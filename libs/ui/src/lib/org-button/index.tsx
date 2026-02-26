import React from 'react';
import cn from 'classnames';
import { Button, type ButtonProps, Link } from '@digdir/designsystemet-react';
import { OrgLogo, type OrgLogoProps } from '../org-logo';
import styles from './org-button.module.scss';

export type OrgButtonProps = {
    href?: string;
} & OrgLogoProps;

const OrgButton = ({ children, className, href, orgLogoSrc, orgNr, ...props }: OrgButtonProps & ButtonProps) => {
    return (
        <Button
            asChild
            data-size='sm'
            variant='tertiary'
            className={cn(styles.wrapper, className)}
            {...props}
        >
            <Link href={href}>
                <OrgLogo
                    className={styles.orgLogo}
                    orgLogoSrc={orgLogoSrc}
                    orgNr={orgNr}
                />
                {children}
            </Link>
        </Button>
    );
};

export default OrgButton;
