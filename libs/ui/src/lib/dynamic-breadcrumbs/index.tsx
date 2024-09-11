'use client';

import { usePathname } from 'next/navigation';

import { i18n, Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';

import Breadcrumbs from '../breadcrumbs';

type DynamicBreadcrumbsProps = {
    commonDictionary: Dictionary;
    docsDictionary: Dictionary;
    baseUri: string;
    locale: LocaleCodes;
};

const DynamicBreadcrumbs = ({ commonDictionary, docsDictionary, baseUri, locale }: DynamicBreadcrumbsProps) => {
    const pathname = usePathname();

    function createBreadcrumbPaths(pathname: string) {
        let parts = pathname.split('/');
        parts.splice(0, 2);

        let paths = [];
        let currentPath = '';

        for (let i = 0; i < parts.length; i++) {
            currentPath += `/${parts[i]}`;
            paths.push({ path: currentPath });
        }

        return paths;
    }

    const items = createBreadcrumbPaths(pathname);

    const textedItems = items.map((item) => ({
        href: `/${locale}${item.path}`,
        text: docsDictionary.titles[item.path],
    }));

    return (
        <Breadcrumbs
            breadcrumbList={textedItems}
            dictionary={commonDictionary}
            baseUri={baseUri}
        />
    );
};

export default DynamicBreadcrumbs;
