'use client';

import { useRouter, usePathname } from 'next/navigation';
import cn from 'classnames';
import { ToggleGroup } from '@digdir/designsystemet-react';

import { i18n } from '@fdk-frontend/i18n';

import styles from './language-switcher.module.scss';

type LanguageSwitcherProps = {
	inverted?: boolean;
};

const LanguageSwitcher = ({ inverted }: LanguageSwitcherProps) => {

	const router = useRouter();
  	const pathName = usePathname();
  	const defaultCode = pathName.split('/')[1];

	const onLanguageSelect = (code) => {
	  const segments = pathName.split('/');
	  segments[1] = code;
	  return router.replace(segments.join('/'));
	};

	return (
		<ToggleGroup
			className={cn(styles.languageSwitcher, { [styles.inverted]: inverted })}
			defaultValue={defaultCode}
			size="sm"
			onChange={(code) => onLanguageSelect(code)}
		>
			{
				i18n.locales.map(locale => (
					<ToggleGroup.Item value={locale.code} key={locale.code}>
						{locale.flag} {locale.name}
					</ToggleGroup.Item>
				))
			}
		</ToggleGroup>
	);
}

export default LanguageSwitcher;