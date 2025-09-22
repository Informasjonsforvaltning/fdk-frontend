import React from 'react';
import cn from 'classnames';
import { Buildings3Icon } from '@navikt/aksel-icons';
import { Button, type ButtonProps, Link } from '@digdir/designsystemet-react';
import styles from './org-button.module.scss';

export type OrgButtonProps = {
    orgLogoSrc?: string | null;
    href?: string;
};

const OrgButton = ({ children, className, href, orgLogoSrc, ...props }: OrgButtonProps & ButtonProps) => {
    return (
        <Button
            asChild
            data-size='sm'
            variant='tertiary'
            className={cn(styles.wrapper, className)}
            {...props}
        >
            <Link href={href}>
                <div className={styles.avatar}>
                    {orgLogoSrc ? (
                        <img
                            aria-hidden
                            src={orgLogoSrc}
                            alt=''
                        />
                    ) : (
                        <Buildings3Icon aria-hidden />
                    )}
                </div>
                {children}
            </Link>
        </Button>
    );
};

export default OrgButton;
