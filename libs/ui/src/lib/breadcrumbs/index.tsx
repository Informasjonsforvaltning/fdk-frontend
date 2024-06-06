import { type Dictionary } from '@fdk-frontend/dictionaries';
import { Link } from '@digdir/designsystemet-react';
import styles from './breadcrumbs.module.css';

export type BreadcrumbType = {
  href: string;
  text: string;
};

export type BreadcrumbsProps = {
  baseUri: string;
  breadcrumbList?: BreadcrumbType[];
  dictionary: Dictionary;
};

const Breadcrumbs = ({ baseUri, breadcrumbList, dictionary }: BreadcrumbsProps) => (
  <div className={styles.container}>
    <nav
      className={styles.breadcrumbs}
      aria-label={dictionary.breadcrumbs}
    >
      <span>
        <Link
          className={styles.link}
          aria-label={dictionary.homePage}
          href={baseUri}
        >
          {dictionary.homePage}
        </Link>
        {breadcrumbList?.map((breadcrumb, i) => (
          <span key={breadcrumb.href}>
            <span className={styles.separator}>{'>'}</span>
            {i === breadcrumbList.length - 1 ? (
              <span className={styles.deactiveLink}>{breadcrumb.text}</span>
            ) : (
              <Link
                className={styles.link}
                href={breadcrumb.href}
              >
                {breadcrumb.text}
              </Link>
            )}
          </span>
        ))}
      </span>
    </nav>
  </div>
);

export { Breadcrumbs };
