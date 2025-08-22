'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import cn from 'classnames';

import { Heading, Button } from '@digdir/designsystemet-react';
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';

import { type LocaleCodes, type Dictionary } from '@fdk-frontend/dictionaries';

import styles from './sidebar.module.scss';

export type SidebarProps = {
    dictionary: Dictionary;
    currentPath: string[];
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
    dictionary: Dictionary;
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

const NestedList = ({ items, locale, pathname, dictionary }: NestedListProps) => {
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
            aria-pressed={isOpen}
            aria-label={isOpen ? dictionary.general.collapse : dictionary.general.expand}
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
                const hasChildren = item.children && item.children?.length > 0;

                return (
                    <li
                        key={item.path}
                        className={cn({ [styles.itemOpen]: isOpen })}
                    >
                        <div>
                            {hasChildren && getToggleButton(isOpen, item.path, )}
                            {itemPathWithLocale === pathname ? (
                                <strong>{item.title}</strong>
                            ) : (
                                <a
                                    href={itemPathWithLocale}
                                    aria-expanded={hasChildren ? isOpen : undefined}
                                    id={item.path}
                                >
                                    {item.title}
                                </a>
                            )}
                        </div>
                        {isOpen && hasChildren && (
                            <NestedList
                                items={item.children as SidebarItemObject[]}
                                locale={locale}
                                pathname={pathname}
                                dictionary={dictionary}
                            />
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

const Sidebar = ({ dictionary, currentPath, locale }: SidebarProps) => {
    const pathname = usePathname();
    const basePath = `/${currentPath.at(0)}`;
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
                <a href={`/${locale}${nestedData?.[0]?.path}`}>{nestedData?.[0]?.title}</a>
            </Heading>
            <NestedList
                items={nestedData[0]?.children || []}
                locale={locale}
                pathname={pathname}
                dictionary = {dictionary}
            />
        </nav>
    );
};

export default Sidebar;
