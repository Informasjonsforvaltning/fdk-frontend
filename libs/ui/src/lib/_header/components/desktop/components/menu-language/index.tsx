'use client';

import { DropdownMenu, Paragraph } from '@digdir/designsystemet-react';
import { i18n } from '@fdk-frontend/dictionaries';
import { onLanguageSelect } from '../../../../utils/common';
import { GlobeIcon } from '@navikt/aksel-icons';
import { usePathname, useRouter } from 'next/navigation';

type DesktopLanguageMenuProps = {
  triggerText: string;
};

const DesktopLanguageMenu = ({ triggerText }: DesktopLanguageMenuProps) => {
  const router = useRouter();
  const pathName = usePathname();
  return (
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
  );
};

export { DesktopLanguageMenu };
