'use client';

import { DropdownMenu } from '@digdir/designsystemet-react';
import { GlobeIcon } from '@navikt/aksel-icons';
import { i18n, Locale } from '@fdk-frontend/dictionaries';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import cn from 'classnames';
import styles from './language-menu.module.css';

type Props = {
  triggerText: string;
  className?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

const LanguageMenu = ({ triggerText, className }: Props) => {
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
    <div className={cn(className, styles.dropdownMenu)}>
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
