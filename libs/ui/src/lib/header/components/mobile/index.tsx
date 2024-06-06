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
import { Fragment, HTMLAttributes, forwardRef } from 'react';
import { HeaderData } from '../../data';

import styles from './mobile.module.css';
import { MobileLanguageMenu } from './components/menu-language';

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
      aria-label='Mobile navigation'
    >
      <DropdownMenu placement='left-start'>
        <DropdownMenuTrigger aria-label={dictionary.menuButton}>
          <MenuHamburgerIcon aria-label='Menu icon' />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={styles.content}>
          {headerData.map((urlObject, i) => (
            <Fragment key={`${urlObject.name ?? urlObject.text}-${i}`}>
              {i > 0 && <Divider />}
              {urlObject.items && (
                <DropdownMenuGroup
                  key={`${urlObject.href}-group`}
                  heading={urlObject.name}
                >
                  {urlObject.items.map((item) => (
                    <DropdownMenuItem key={item.href}>
                      <Link href={item.href}>{item.text}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              )}
              {urlObject.href && (
                <DropdownMenuGroup
                  heading={urlObject.name}
                  key={`${urlObject.href}-item`}
                >
                  <DropdownMenuItem>
                    <Link
                      href={urlObject.href}
                      target={urlObject.external ? '_blank' : undefined}
                      rel='noreferrer'
                    >
                      {urlObject.text}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              )}
            </Fragment>
          ))}
          <Divider />
          <MobileLanguageMenu text={dictionary.language} />
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  ),
);

MobileHeader.displayName = 'MobileHeader';

export type { MobileHeaderProps };
export { MobileHeader };
