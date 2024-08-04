'use client';

import cn from 'classnames';
import { ToggleGroup } from '@digdir/designsystemet-react';

import { i18n } from '@fdk-frontend/dictionaries';

import styles from './language-switcher.module.scss';

type LanguageSwitcher = {
	inverted?: boolean;
};

const LanguageSwitcher = ({ inverted }: LanguageSwitcher) => {
	return (
		<ToggleGroup
			className={cn(styles.languageSwitcher, { [styles.inverted]: inverted })}
			defaultValue="Peanut"
			name="toggle-group-nuts"
			size="sm"
		>
			{
				i18n.locales.map(locale => (
					<ToggleGroup.Item value={locale.code}>
						{locale.flag} {locale.name}
					</ToggleGroup.Item>
				))
			}
		</ToggleGroup>
	);
}

export default LanguageSwitcher;