import React from 'react';
import cn from 'classnames';
import { type LocaleCodes } from '@fdk-frontend/localization';
import { isOpenLicense } from '@fdk-frontend/utils';
import Box from '../box';
import ExternalLink from '../external-link';
import { Tag } from '@digdir/designsystemet-react';
import styles from './styles.module.scss';

type LicenseBoxLinkProps = {
    uri: string;
    locale: LocaleCodes;
    openLicenseLabel: string;
};

const LicenseBoxLink = ({
    children,
    uri,
    locale,
    openLicenseLabel,
    ...props
}: LicenseBoxLinkProps & React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <Box
            className={cn(styles.wrapper, { [styles.isOpenLicense]: isOpenLicense(uri) })}
            {...props}
        >
            <ExternalLink
                href={uri}
                locale={locale}
                className='fdk-box-link'
            >
                {children}
            </ExternalLink>
            {isOpenLicense(uri) && (
                <div className={styles.licenseTagContainer}>
                    <Tag
                        data-color='success'
                        data-size='md'
                    >
                        {openLicenseLabel}
                    </Tag>
                </div>
            )}
        </Box>
    );
};

export default LicenseBoxLink;
