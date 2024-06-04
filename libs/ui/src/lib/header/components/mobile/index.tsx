import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  Divider,
  DropdownMenuGroup,
  DropdownMenuItem,
  Link,
} from '@digdir/designsystemet-react';
import { Dictionary } from '@fdk-frontend/dictionaries';
import { MenuHamburgerIcon } from '@navikt/aksel-icons';
import { HTMLAttributes, forwardRef } from 'react';
import { HeaderData } from '../../data';
import { LanguageMenu } from '../menu-language';

import styles from './mobile.module.css';

type MobileHeaderProps = {
  dictionary: Dictionary;
  headerData: HeaderData;
  className?: string;
} & HTMLAttributes<HTMLButtonElement>;

const MobileHeader = forwardRef<HTMLButtonElement, MobileHeaderProps>(
  ({ dictionary, headerData, ...rest }: MobileHeaderProps, ref) => (
    <nav
      ref={ref}
      {...rest}
      className={styles.nav}
    >
      <DropdownMenu placement='left-start'>
        <DropdownMenuTrigger>
          <MenuHamburgerIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={styles.content}>
          {headerData.map((urlObject, i) => (
            <>
              {i > 0 && <Divider />}
              {urlObject.items ? (
                <DropdownMenuGroup
                  key={urlObject.href}
                  heading={urlObject.name}
                >
                  {urlObject.items.map((item) => (
                    <DropdownMenuItem key={item.href}>
                      <Link href={item.href}>{item.text}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              ) : (
                <DropdownMenuGroup
                  heading={urlObject.name}
                  key={urlObject.href}
                >
                  {urlObject.href && (
                    <DropdownMenuItem key={urlObject.name}>
                      <Link
                        href={urlObject.href}
                        target={urlObject.external ? '_blank' : undefined}
                        rel='noreferrer'
                      >
                        {urlObject.text}
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
              )}
            </>
          ))}
          <LanguageMenu text={dictionary.language} />
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  ),
);

MobileHeader.displayName = 'MobileHeader';

export type { MobileHeaderProps };
export { MobileHeader };
