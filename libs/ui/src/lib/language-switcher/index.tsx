'use client';

import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { ToggleGroup } from '@digdir/designsystemet-react';

import { i18n, LocaleCodes } from '@fdk-frontend/dictionaries';

import styles from './language-switcher.module.scss';

const LanguageSwitcher = (props: React.HTMLAttributes<HTMLElement>) => {
    const router = useRouter();
    const pathName = usePathname();

    const defaultCode = pathName.split('/')[1];

    const onLanguageSelect = (code: LocaleCodes) => {
        const url = new URL(window.location.href);
        const segments = url.pathname.split('/');
        segments[1] = code;
        url.pathname = segments.join('/');
        router.replace(url.toString());
    };

    return (
        <nav
            aria-label='Select language'
            {...props}
        >
            <ToggleGroup
                className={styles.languageSwitcher}
                defaultValue={defaultCode}
                onChange={(code) => onLanguageSelect(code as LocaleCodes)}
                data-size='sm'
            >
                {i18n.locales.map((locale) => (
                    <ToggleGroup.Item
                        value={locale.code}
                        key={locale.code}
                    >
                        {locale.name}
                    </ToggleGroup.Item>
                ))}
            </ToggleGroup>
        </nav>
    );
};

export default LanguageSwitcher;
