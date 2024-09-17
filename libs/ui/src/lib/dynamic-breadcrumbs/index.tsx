'use client';

import { usePathname } from 'next/navigation';

import { Dictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';

import Breadcrumbs from '../breadcrumbs';

type DynamicBreadcrumbsProps = {
    commonDictionary: Dictionary;
    docsDictionary: Dictionary;
    baseUri: string;
    locale: LocaleCodes;
};

const DynamicBreadcrumbs = ({ commonDictionary, docsDictionary, baseUri, locale }: DynamicBreadcrumbsProps) => {
    const pathname = usePathname();

    const createBreadcrumbPaths = function (pname: string) {
        const parts = pname.split('/');
        parts.splice(0, 2);

        const paths = [];
        let currentPath = '';

        for (let i = 0; i < parts.length; i++) {
            currentPath += `/${parts[i]}`;
            paths.push({ path: currentPath });
        }

        return paths;
    };

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
