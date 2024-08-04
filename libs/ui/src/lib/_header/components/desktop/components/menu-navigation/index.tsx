import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@digdir/designsystemet-react';
import { LinkObjectType } from '@fdk-frontend/types';
import { HTMLAttributes } from 'react';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import { Link } from '../../../../../link';

import styles from './menu-navigation.module.css';

type NavigationMenuProps = {
  triggerText: string;
  links: LinkObjectType[];
  className?: string;
} & HTMLAttributes<HTMLButtonElement>;

const NavigationMenu = ({ triggerText, links }: NavigationMenuProps) => (
  <DropdownMenu size='small'>
    <DropdownMenuTrigger className={styles.dropDown}>
      {triggerText}
      <ChevronDownIcon role={'presentation'} />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuGroup>
        {links.map(
          (link) =>
            link.href && (
              <DropdownMenuItem
                key={link.text}
                asChild
              >
                <Link
                  href={link.href}
                  external={link.external}
                >
                  {link.text}
                </Link>
              </DropdownMenuItem>
            ),
        )}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

export { NavigationMenu };
