import Image from 'next/image';
import FDKLogo from './images/fdk-logo.svg';
import FDKDemoLogo from './images/fdk-logo-demo.svg';
import { getHeaderData } from './data';
import { Link } from '@digdir/designsystemet-react';
import { unstable_noStore as noStore } from 'next/cache';
import { Dictionary } from '@fdk-frontend/dictionaries';
import { forwardRef, HTMLAttributes } from 'react';
import { MobileHeader } from './components/mobile';
import { DesktopHeader } from './components/desktop';
import cn from 'classnames';

import styles from './header.module.css';

type HeaderProps = {
  dictionary: Dictionary;
  baseUri?: string;
  communityBaseUri?: string;
  registrationBaseUri?: string;
  useDemoLogo?: boolean;
} & HTMLAttributes<HTMLElement>;

const Header = forwardRef<HTMLElement, HeaderProps>(
  (
    { dictionary, baseUri = '/', communityBaseUri = '#', registrationBaseUri = '#', useDemoLogo, ...rest }: HeaderProps,
    ref,
  ) => {
    // Opt-in dynamic rendering
    noStore();

    const headerData = getHeaderData(dictionary, baseUri, communityBaseUri, registrationBaseUri);

    return (
      <header
        ref={ref}
        {...rest}
        className={cn(styles.header, rest.className)}
      >
        <Link
          href={baseUri}
          aria-label={dictionary.goToMainPageAriaLabel}
          className={styles.logo}
        >
          <Image
            src={useDemoLogo ? FDKDemoLogo : FDKLogo}
            alt={dictionary.fdkLogoAlt}
            width={0}
            height={0}
          />
        </Link>
        <DesktopHeader
          dictionary={dictionary}
          headerData={headerData}
          className={styles.desktopHeader}
        />
        <MobileHeader
          dictionary={dictionary}
          headerData={headerData}
          className={styles.mobileHeader}
        />
      </header>
    );
  },
);

Header.displayName = 'Header'; // Add display name to the component

export { Header };
export type { HeaderProps };
