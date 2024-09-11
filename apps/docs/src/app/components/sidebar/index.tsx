'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

import { Link, Heading } from '@digdir/designsystemet-react';

import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';

import styles from './sidebar.module.scss';

export type SidebarProps = {
    dictionary: Dictionary;
    slug: string[];
    locale: LocaleCodes;
};

type SidebarItemObject = {
    path: string;
    title: string;
    level: number;
};

const Sidebar = ({ dictionary, slug, locale }: SidebarProps) => {
    const pathname = usePathname();
    const basePath = `/${slug.at(0)}`;
    const basePathWithLocale = `/${locale}${basePath}`;

    const items: SidebarItemObject[] = Object.entries(dictionary.titles as Record<string, string>)
        .filter(([path, title]) => path.startsWith(basePath))
        .map(([path, title]) => ({
            path,
            title,
            level: path.replace(basePath, '').split('/').length - 1,
        }));

    const renderList = (items: SidebarItemObject[], level = 1) => {
        return (
            <ul className={styles.sidebarList}>
                {items
                    .filter((item) => item.level === level)
                    .map((item) => {
                        const childItems = items.filter(
                            (child) => child.path.startsWith(item.path) && child.level === level + 1,
                        );

                        const itemPathWithLocale = `/${locale}${item.path}`;

                        return (
                            <li key={item.path}>
                                {itemPathWithLocale === pathname ? (
                                    <strong>{item.title}</strong>
                                ) : (
                                    <a href={itemPathWithLocale}>{item.title}</a>
                                )}
                                {childItems.length > 0 && renderList(items, level + 1)}
                            </li>
                        );
                    })}
            </ul>
        );
    };

    const sidebarContent = useMemo(() => renderList(items), [items, locale]);

    return (
        <div className={styles.sidebar}>
            <Heading
                level={2}
                size='xs'
            >
                <Link href={`/${locale}${items?.at(0)?.path}`}>{items?.at(0)?.title}</Link>
            </Heading>
            {sidebarContent}
        </div>
    );
};

export default Sidebar;
