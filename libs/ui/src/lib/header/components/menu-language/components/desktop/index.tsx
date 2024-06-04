import { DropdownMenu, Paragraph } from '@digdir/designsystemet-react';
import { i18n } from '@fdk-frontend/dictionaries';
import { onLanguageSelect } from '../../../../utils/common';
import { GlobeIcon } from '@navikt/aksel-icons';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import styles from './menu-desktop-language.module.css';

type DesktopLanguageMenuProps = {
  triggerText: string;
  router: AppRouterInstance;
  pathName: string;
};

const DesktopLanguageMenu = ({ triggerText, router, pathName }: DesktopLanguageMenuProps) => (
  <div className={styles.desktopLanguageMenu}>
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <GlobeIcon
          role={'presentation'}
          width={30}
          height={30}
        />
        {triggerText}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          {i18n.locales.map((locale) => (
            <DropdownMenu.Item
              key={locale.code}
              onClick={() => onLanguageSelect(locale, router, pathName)}
            >
              <Paragraph size='small'>{locale.name}</Paragraph>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu>
  </div>
);

export { DesktopLanguageMenu };
