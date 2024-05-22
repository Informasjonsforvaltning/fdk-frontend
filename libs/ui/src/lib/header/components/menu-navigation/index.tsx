import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@digdir/designsystemet-react';
import { LinkObjectType } from '@fdk-frontend/types';
import React from 'react';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import { Link } from '../../../link';

type NavigationMenuProps = {
  triggerText: string;
  links: LinkObjectType[];
  className?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

const NavigationMenu = ({ triggerText, links }: NavigationMenuProps) => (
  <DropdownMenu size='small'>
    <DropdownMenuTrigger>
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

export default NavigationMenu;
