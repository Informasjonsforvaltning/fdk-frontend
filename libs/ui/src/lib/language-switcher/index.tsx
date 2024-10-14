'use client';

import { useRouter, usePathname } from 'next/navigation';
import cn from 'classnames';
import { ToggleGroup } from '@digdir/designsystemet-react';

import { i18n, LocaleCodes } from '@fdk-frontend/dictionaries';

import styles from './language-switcher.module.scss';

type LanguageSwitcherProps = {
    inverted?: boolean;
};

const LanguageSwitcher = ({ inverted }: LanguageSwitcherProps) => {
    const router = useRouter();
    const pathName = usePathname();

    const defaultCode = pathName.split('/')[1];

    const onLanguageSelect = (code: LocaleCodes) => {
        const segments = pathName.split('/');
        segments[1] = code;
        return router.replace(segments.join('/'));
    };

    return (
        <nav aria-label='Select language'>
            <ToggleGroup
                className={cn(styles.languageSwitcher, { [styles.inverted]: inverted })}
                defaultValue={defaultCode}
                size='sm'
                onChange={(code) => onLanguageSelect(code as LocaleCodes)}
                name='Select language'
            >
                {i18n.locales.map((locale) => (
                    <ToggleGroup.Item
                        value={locale.code}
                        key={locale.code}
                    >
                        <span aria-hidden='true'>{locale.flag}</span> {locale.name}
                    </ToggleGroup.Item>
                ))}
            </ToggleGroup>
        </nav>
    );
};

export default LanguageSwitcher;
