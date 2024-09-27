'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

import { Link, Heading, Button } from '@digdir/designsystemet-react';
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';

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
    children?: SidebarItemObject[];
};

type NestedListProps = {
    items: SidebarItemObject[];
    locale: LocaleCodes;
    pathname: string;
};

const buildNestedStructure = (data: Dictionary, basePath: string, locale: LocaleCodes): SidebarItemObject[] => {
    const items: SidebarItemObject[] = Object.entries(data)
        .filter(([path]) => path.startsWith(basePath))
        .map(([path, title]) => ({
            path,
            title,
            level: path.replace(basePath, '').split('/').length - 1,
        }));

    const nested: SidebarItemObject[] = [];
    const map: Record<string, SidebarItemObject & { children: SidebarItemObject[] }> = {};

    items.forEach((item) => {
        map[item.path] = { ...item, children: [] };
        if (item.level === 0) {
            nested.push(map[item.path]);
        } else {
            const parentPath = item.path.split('/').slice(0, -1).join('/');
            map[parentPath]?.children.push(map[item.path]);
        }
    });

    return nested;
};

const NestedList = ({ items, locale, pathname }: NestedListProps) => {
    const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
        const initialOpenState: Record<string, boolean> = {};
        items.forEach((item) => {
            if (pathname.includes(item.path)) {
                initialOpenState[item.path] = true;
            }
        });
        return initialOpenState;
    });

    const toggleOpen = (itemPath: string) => {
        setOpenItems((prev) => ({
            ...prev,
            [itemPath]: !prev[itemPath],
        }));
    };

    const getToggleButton = (isOpen: boolean, itemPath: string) => (
        <Button
            variant='tertiary'
            onClick={() => toggleOpen(itemPath)}
        >
            {isOpen ? (
                <ChevronUpIcon
                    aria-hidden
                    fontSize='1.5rem'
                />
            ) : (
                <ChevronDownIcon
                    aria-hidden
                    fontSize='1.5rem'
                />
            )}
        </Button>
    );

    return (
        <ul className={styles.sidebarList}>
            {items.map((item) => {
                const itemPathWithLocale = `/${locale}${item.path}`;
                const isOpen = openItems[item.path] || false;

                return (
                    <li
                        key={item.path}
                        className={cn({ [styles.itemOpen]: isOpen })}
                    >
                        <div>
                            {itemPathWithLocale === pathname ? (
                                <strong>{item.title}</strong>
                            ) : (
                                <a href={itemPathWithLocale}>{item.title}</a>
                            )}
                            {item.children && item.children.length > 0 && getToggleButton(isOpen, item.path)}
                        </div>
                        {isOpen && item.children && item.children?.length > 0 && (
                            <NestedList
                                items={item.children}
                                locale={locale}
                                pathname={pathname}
                            />
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

const Sidebar = ({ dictionary, slug, locale }: SidebarProps) => {
    const pathname = usePathname();
    const basePath = `/${slug.at(0)}`;
    const nestedData = buildNestedStructure(dictionary.titles, basePath, locale);

    return (
        <nav
            className={styles.sidebar}
            aria-labelledby='sidebar-heading'
        >
            <Heading
                id='sidebar-heading'
                level={2}
                size='xs'
            >
                <Link href={`/${locale}${nestedData?.[0]?.path}`}>{nestedData?.[0]?.title}</Link>
            </Heading>
            <NestedList
                items={nestedData[0]?.children || []}
                locale={locale}
                pathname={pathname}
            />
        </nav>
    );
};

export default Sidebar;
