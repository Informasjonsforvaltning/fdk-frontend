'use client';

import { DropdownMenu, Link } from '@digdir/designsystemet-react';
import { i18n } from '@fdk-frontend/dictionaries';
import { onLanguageSelect } from '../../../../utils/common';
import { usePathname, useRouter } from 'next/navigation';

type MobileLanguageMenuProps = {
  text: string;
};

const MobileLanguageMenu = ({ text }: MobileLanguageMenuProps) => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <DropdownMenu.Group heading={text}>
      {i18n.locales.map((locale) => (
        <DropdownMenu.Item
          key={locale.code}
          onClick={() => onLanguageSelect(locale, router, pathName)}
        >
          <Link>{locale.name}</Link>
        </DropdownMenu.Item>
      ))}
    </DropdownMenu.Group>
  );
};

export { MobileLanguageMenu };
