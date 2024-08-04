import { Link, ListItem, ListUnordered } from '@digdir/designsystemet-react';
import { Dictionary } from '@fdk-frontend/dictionaries';
import { HTMLAttributes, forwardRef } from 'react';
import { HeaderData } from '../../data';
import { NavigationMenu } from './components/menu-navigation';
import cn from 'classnames';

import styles from './desktop.module.css';
import { DesktopLanguageMenu } from './components/menu-language';

type DesktopHeaderProps = {
  dictionary: Dictionary;
  headerData: HeaderData;
} & HTMLAttributes<HTMLButtonElement>;

const DesktopHeader = forwardRef<HTMLButtonElement, DesktopHeaderProps>(
  ({ dictionary, headerData, ...rest }: DesktopHeaderProps, ref) => (
    <nav
      ref={ref}
      {...rest}
      className={cn(styles.desktopHeader, rest.className)}
    >
      <ListUnordered className={styles.unorderedList}>
        {headerData.map((urlObject) => (
          <ListItem key={urlObject.name ?? urlObject.text}>
            {urlObject.items ? (
              <NavigationMenu
                key={urlObject.name}
                triggerText={urlObject.name}
                links={urlObject.items}
              />
            ) : (
              urlObject.href && (
                <Link
                  href={urlObject.href}
                  target={urlObject.external ? '_blank' : undefined}
                  rel='noreferrer'
                >
                  {urlObject.text}
                </Link>
              )
            )}
          </ListItem>
        ))}
      </ListUnordered>
      <DesktopLanguageMenu triggerText={dictionary.language} />
    </nav>
  ),
);

DesktopHeader.displayName = 'DesktopHeader';

export type { DesktopHeaderProps };
export { DesktopHeader };
