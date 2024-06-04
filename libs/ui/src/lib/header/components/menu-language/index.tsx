'use client';

import { HTMLAttributes } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { DesktopLanguageMenu } from './components/desktop';
import { MobileLanguageMenu } from './components/mobile';

type LanguageMenuProps = {
  text: string;
} & HTMLAttributes<HTMLButtonElement>;

const LanguageMenu = ({ text }: LanguageMenuProps) => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <>
      <DesktopLanguageMenu
        triggerText={text}
        router={router}
        pathName={pathName}
      />
      <MobileLanguageMenu
        heading={text}
        router={router}
        pathName={pathName}
      />
    </>
  );
};

export type { LanguageMenuProps };
export { LanguageMenu };
