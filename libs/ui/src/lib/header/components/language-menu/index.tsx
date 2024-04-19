'use client';

import { DropdownMenu } from '@digdir/designsystemet-react';
import { GlobeIcon } from '@navikt/aksel-icons';
import { i18n, Locale } from '@fdk-frontend/dictionaries';
import styles from './language-menu.module.css';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  triggerText: string;
}

const LanguageMenu = ({ triggerText }: Props) => {
  const pathName = usePathname();
  const router = useRouter();

  const onLanguageSelect = (locale: Locale) => {
    if (!pathName) {
      return '/';
    }
    const segments = pathName.split('/');
    segments[1] = locale.code;
    return router.replace(segments.join('/'));
  };

  return (
    <div className={styles.dropdownMenu}>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <GlobeIcon />
          {triggerText}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            {i18n.locales.map((locale) => (
              <DropdownMenu.Item
                key={locale.code}
                onClick={() => onLanguageSelect(locale)}
              >
                {locale.name}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
};

export default LanguageMenu;
