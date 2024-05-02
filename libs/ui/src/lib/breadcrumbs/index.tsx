import 'server-only';

import { type Dictionary } from '@fdk-frontend/dictionaries';
import { Link } from '../link';
import styles from './breadcrumbs.module.css';
import { getPaths } from '@fdk-frontend/utils';

export type BreadcrumbType = {
  href: string;
  text: string;
};

export type BreadcrumbsProps = {
  baseURI?: string;
  breadcrumbList?: BreadcrumbType[];
  dictionary: Dictionary;
};

const Breadcrumbs = async ({ baseURI, breadcrumbList, dictionary }: BreadcrumbsProps) => (
  <div className={styles.container}>
    <nav className={styles.breadcrumbs}>
      <span>
        <Link
          className={styles.link}
          aria-label={dictionary.homePage}
          href={baseURI ?? process.env.FDK_BASE_URI ?? getPaths().root}
        >
          {dictionary.homePage}
        </Link>
        {breadcrumbList?.map((breadcrumb, i) => (
          <span key={breadcrumb.href}>
            <span className={styles.separator}>{'>'}</span>
            {i === breadcrumbList.length - 1 ? (
              <span className={styles.deactiveLink}>{breadcrumb.text}</span>
            ) : (
              <Link href={breadcrumb.href}>{breadcrumb.text}</Link>
            )}
          </span>
        ))}
      </span>
    </nav>
  </div>
);

export { Breadcrumbs };
