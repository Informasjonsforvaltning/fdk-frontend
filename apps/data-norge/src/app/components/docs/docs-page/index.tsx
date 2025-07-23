import fs from 'node:fs/promises';
import path from 'node:path';
import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { i18n, getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import { mdxComponents, CatalogsMenu, CatalogPromo } from '@fdk-frontend/ui';
import MdxPage from '../mdx-page';

const getContentDirectory = (rootContentDirectory: string) => {
    return path.join(process.cwd(), 'public', 'content', rootContentDirectory);
};

export type DocsPageProps = {
    rootContentDirectory: string;
    params: Promise<{
        lang: LocaleCodes;
        slug: string[];
    }>;
};

export default async function DocsPage(pageProps: DocsPageProps) {
    const params = await pageProps.params;
    const rootContentDirectory = pageProps.rootContentDirectory;
    const locale = params.lang ?? i18n.defaultLocale;
    const slug = params.slug ?? [];
    const pageName = slug.length ? slug.at(-1) : rootContentDirectory;

    // Construct .mdx filepath based on URL slug and locale
    const contentDirectory = getContentDirectory(rootContentDirectory);
    const filePath = path.resolve(process.cwd(), contentDirectory, ...slug, `${pageName}.${locale}.mdx`);

    const dictionary = await getDictionary(locale, 'common');

    try {
        // Get raw MDX source
        const source = await fs.readFile(filePath, 'utf8');

        // Compile MDX and extract content
        const { content, frontmatter } = await compileMDX({
            source,
            options: {
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                },
                parseFrontmatter: true,
            },
            components: {
                ...mdxComponents({ locale }),
                CatalogPromo,
                CatalogsMenu: () => (
                    <CatalogsMenu
                        locale={locale}
                        dictionary={dictionary}
                    />
                ),
                NegativeMargin: (props: React.HTMLAttributes<HTMLDivElement>) => (
                    <div
                        style={{ marginLeft: '-1rem', marginRight: '-1rem' }}
                        {...props}
                    />
                ),
            },
        });

        // Render page
        return (
            <MdxPage
                sidebars={frontmatter.sidebars as boolean | undefined}
                currentPath={[rootContentDirectory, ...slug]}
                locale={locale}
                source={source}
            >
                {content}
            </MdxPage>
        );
    } catch (err) {
        console.error(`Failed to compile MDX page for filePath ${filePath}`, JSON.stringify(err));
        notFound();
    }
}

/**
 * In generateMetadata we do exactly the same as in the Page component,
 * except we extract frontmatter instead of content from MDX compilation
 */
export const generateMetadata = async function (pageProps: DocsPageProps): Promise<Metadata> {
    const params = await pageProps.params;
    const rootContentDirectory = pageProps.rootContentDirectory;
    const locale = params.lang ?? i18n.defaultLocale;
    const slug = params.slug ?? [];

    const pageName = slug.length ? slug.at(-1) : rootContentDirectory;

    const contentDirectory = getContentDirectory(rootContentDirectory);

    // Construct .mdx filepath based on URL slug and locale
    const filePath = path.resolve(process.cwd(), contentDirectory, ...slug, `${pageName}.${locale}.mdx`);

    try {
        const source = await fs.readFile(filePath, 'utf8');

        const { frontmatter } = await compileMDX({
            source,
            options: { parseFrontmatter: true },
        });

        const title = frontmatter.title ? `${frontmatter.title} - data.norge.no` : `data.norge.no`;
        const description = frontmatter.description as string | undefined;

        return {
            title,
            description,
        };
    } catch {
        return notFound();
    }
};
