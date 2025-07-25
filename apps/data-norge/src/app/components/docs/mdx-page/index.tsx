import cn from 'classnames';

import { PropsWithChildren } from 'react';

import { DynamicBreadcrumbs } from '@fdk-frontend/ui';
import { type LocaleCodes, getDictionary } from '@fdk-frontend/dictionaries';

import Sidebar from '../sidebar';
import TableOfContents from '../table-of-contents';

import pageStyles from './mdx-page.module.scss';

import { extractHeadlines, type MdxHeadlineObjectNode } from './utils';

export type MdxPageProps = PropsWithChildren & {
    currentPath: string[];
    locale: LocaleCodes;
    source: string;
    sidebars?: boolean;
};

const MdxPage = async ({ children, sidebars = true, currentPath, locale, source }: MdxPageProps) => {
    const docsDictionary = await getDictionary(locale, 'docs');
    const commonDictionary = await getDictionary(locale, 'common');

    const headlines: MdxHeadlineObjectNode[] = extractHeadlines(source);

    return (
        <div className={pageStyles.mdxPage}>
            <DynamicBreadcrumbs
                docsDictionary={docsDictionary}
                commonDictionary={commonDictionary}
                locale={locale}
            />
            <div className={cn(pageStyles.content, { [pageStyles.noSidebars]: !sidebars })}>
                {sidebars && (
                    <div className={pageStyles.leftColumn}>
                        <div className={pageStyles.asideContent}>
                            <Sidebar
                                dictionary={docsDictionary}
                                currentPath={currentPath}
                                locale={locale}
                            />
                        </div>
                    </div>
                )}
                <div className={pageStyles.mainColumn}>
                    <article className={cn(pageStyles.article)}>{children}</article>
                </div>
                {sidebars && (
                    <div className={pageStyles.rightColumn}>
                        <div className={pageStyles.asideContent}>
                            <TableOfContents
                                dictionary={docsDictionary}
                                headlines={headlines}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MdxPage;
