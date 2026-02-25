'use client';

import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { Buildings3Icon } from '@navikt/aksel-icons';
import styles from './styles.module.scss';

export type OrgLogoProps = {
    orgLogoSrc?: string | null;
    orgNr?: string;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const OrgLogo = ({ className, orgLogoSrc, orgNr, ...props }: OrgLogoProps) => {
    const imgSrc =
        orgLogoSrc ?? (orgNr ? `https://orglogo.digdir.no/api/emblem/svg/${orgNr}` : null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setImageError(false);
    }, [imgSrc]);

    const showFallback = !imgSrc || imageError;

    return (
        <div className={cn(styles.orgLogo, className)} {...props}>
            {showFallback ? (
                <Buildings3Icon aria-hidden />
            ) : (
                <img
                    aria-hidden
                    src={imgSrc}
                    alt=''
                    onError={() => setImageError(true)}
                />
            )}
        </div>
    );
};

export default OrgLogo;
export { OrgLogo };
