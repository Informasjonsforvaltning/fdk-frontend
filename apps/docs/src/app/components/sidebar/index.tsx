'use client';
import { useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

import styles from './sidebar.module.scss';

const Sidebar = ({ files, locale, dictionary }) => {
  const pathname = usePathname();

  const getPageUrlWithoutLocale = (pageUrlWithLocale) => {
    const parts = pageUrlWithLocale.split('/');
    parts.splice(0, 2);
    return `/${parts.join('/')}`;
  };

  const renderLinkOrText = (pageUrlWithLocale, pageUrlWithoutLocale) => {
    const title = dictionary.titles[pageUrlWithoutLocale] || 'title missing';
    return pageUrlWithLocale !== pathname ? (
      <a href={pageUrlWithLocale}>{title}</a>
    ) : (
      <strong>{title}</strong>
    );
  };

  const renderNestedList = (data, basePath = '') => {
    return (
      <ul>
        {Object.entries(data).map(([key, value]) => {
          const pageUrlWithLocale = `${basePath}${key}`;
          const pageUrlWithoutLocale = getPageUrlWithoutLocale(pageUrlWithLocale);

          return (
            <li key={key}>
              {renderLinkOrText(pageUrlWithLocale, pageUrlWithoutLocale)}
              {Object.keys(value).length > 0 && renderNestedList(value, `${basePath}${key}/`)}
            </li>
          );
        })}
      </ul>
    );
  };

  const sidebarContent = useMemo(() => renderNestedList(files, `/${locale}/`), [files, locale]);

  return <div className={styles.sidebar}>{sidebarContent}</div>;
};

export default Sidebar;
