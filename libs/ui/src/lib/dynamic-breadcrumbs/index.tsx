'use client';

import { usePathname } from 'next/navigation'

import { i18n, Dictionary } from '@fdk-frontend/dictionaries';

import Breadcrumbs from '../breadcrumbs';

type DynamicBreadcrumbsProps = {
    commonDictionary: Dictionary;
    docsDictionary: Dictionary;
    baseUri: string;
};

const DynamicBreadcrumbs = ({ commonDictionary, docsDictionary, baseUri }: DynamicBreadcrumbsProps) => {

    const pathname = usePathname();

    function createBreadcrumbPaths(pathname) {
        let parts = pathname.split('/');
        parts.splice(0, 2);

        let paths = [];
        let currentPath = "";

        for (let i = 0; i < parts.length; i++) {
            currentPath += `/${parts[i]}`;
            paths.push({ path: currentPath });
        }

        return paths;
    }

    const items = createBreadcrumbPaths(pathname);

    const textedItems = items.map(item => ({
        href: item.path,
        text: docsDictionary.titles[item.path]
    }));

    return (
        <Breadcrumbs
            breadcrumbList={textedItems}
            dictionary={commonDictionary}
            baseUri={baseUri}
        />
    );
}

export default DynamicBreadcrumbs;