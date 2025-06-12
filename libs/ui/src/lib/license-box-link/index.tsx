import React from 'react';
import cn from 'classnames';
import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';
import { isOpenLicense } from '@fdk-frontend/utils';
import Box from '../box';
import ExternalLink from '../external-link';
import OpenLicenseTag from '../open-license-tag';
import styles from './styles.module.scss';

type LicenseBoxLinkProps = {
	uri: string;
	locale: LocaleCodes;
	dictionary: Dictionary;
}

const LicenseBoxLink = ({ children, uri, dictionary, locale, ...props }: LicenseBoxLinkProps & React.HTMLAttributes<HTMLDivElement>) => {
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
                	<OpenLicenseTag dictionary={dictionary} />
                </div>
            )}
		</Box>
	);
}

export default LicenseBoxLink;