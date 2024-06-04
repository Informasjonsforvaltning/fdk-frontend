import { Divider, DropdownMenu, DropdownMenuGroup, DropdownMenuItem, Paragraph } from '@digdir/designsystemet-react';
import { i18n } from '@fdk-frontend/dictionaries';
import { onLanguageSelect } from '../../../../utils/common';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import styles from './mobile.module.css';

type MobileLanguageMenuProps = {
  heading: string;
  router: AppRouterInstance;
  pathName: string;
};

const MobileLanguageMenu = ({ heading, router, pathName }: MobileLanguageMenuProps) => (
  <div className={styles.mobileLanguageMenu}>
    <Divider />
    <DropdownMenu>
      <DropdownMenuGroup heading={heading}>
        {i18n.locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onClick={() => onLanguageSelect(locale, router, pathName)}
          >
            <Paragraph size='small'>{locale.name}</Paragraph>
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
    </DropdownMenu>
  </div>
);

export { MobileLanguageMenu };
