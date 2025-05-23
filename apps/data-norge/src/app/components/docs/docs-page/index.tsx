import fs from 'node:fs/promises';
import path from 'node:path';
import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import {
    Ingress,
    type IngressProps,
    Alert,
    type AlertProps,
    Button,
    Heading,
    type HeadingProps,
    Link,
    Paragraph,
    Divider,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableHeaderCell,
    TableCell,
    Tag,
    type TagProps,
} from '@digdir/designsystemet-react';
import CatalogsMenu from '@fdk-frontend/ui/catalogs-menu';
import ExternalLink from '@fdk-frontend/ui/external-link';
import { i18n, getDictionary, type LocaleCodes } from '@fdk-frontend/dictionaries';
import MdxPage from '../mdx-page';
import MdxHeading from '../mdx-heading';
import CatalogPromo from '../catalog-promo';
import ConceptPreview, { ConceptPreviewProps } from '../concept-preview';

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

    const commonDictionary = await getDictionary(locale, 'common');

    try {
        // Get raw MDX source
        const source = await fs.readFile(filePath, 'utf8');

        // Prepare client component map for MDX compilation
        const components = {
            h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
                <MdxHeading
                    level={1}
                    {...props}
                />
            ),
            h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
                <MdxHeading
                    level={2}
                    {...props}
                />
            ),
            h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
                <MdxHeading
                    level={3}
                    {...props}
                />
            ),
            h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
                <MdxHeading
                    level={4}
                    {...props}
                />
            ),
            h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
                <MdxHeading
                    level={5}
                    {...props}
                />
            ),
            h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
                <MdxHeading
                    level={6}
                    {...props}
                />
            ),
            p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
                <Paragraph
                    size='sm'
                    {...props}
                />
            ),
            Paragraph: (props: React.HTMLAttributes<HTMLParagraphElement>) => <Paragraph {...props} />,
            Heading: (props: HeadingProps) => <Heading {...props} />,
            Alert: ({ size = 'sm', iconTitle = ' ', ...props }: AlertProps) => (
                <Alert
                    size={size}
                    iconTitle={iconTitle}
                    {...props}
                />
            ),
            Button,
            ConceptPreview: (props: ConceptPreviewProps) => (
                <ConceptPreview
                    {...props}
                    lang={locale}
                />
            ),
            Link,
            Divider,
            CatalogPromo,
            CatalogsMenu: () => (
                <CatalogsMenu
                    dictionary={commonDictionary}
                    locale={locale}
                />
            ),
            NegativeMargin: (props: React.HTMLAttributes<HTMLDivElement>) => (
                <div
                    style={{ marginLeft: '-1rem', marginRight: '-1rem' }}
                    {...props}
                />
            ),
            Image,
            table: ({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
                <Table
                    {...(props as any)}
                    size='sm'
                >
                    {children}
                </Table>
            ),
            thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
                <TableHead {...props}>{children}</TableHead>
            ),
            tbody: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
                <TableBody {...props}>{children}</TableBody>
            ),
            tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
                <TableRow {...props}>{children}</TableRow>
            ),
            th: (
                { children, ...props }: React.ThHTMLAttributes<HTMLTableHeaderCellElement>, // eslint-disable-line
            ) => <TableHeaderCell {...props}>{children}</TableHeaderCell>,
            td: (
                { children, ...props }: React.TdHTMLAttributes<HTMLTableDataCellElement>, // eslint-disable-line
            ) => <TableCell {...props}>{children}</TableCell>,
            Tag: (props: TagProps) => (
                <Tag
                    {...props}
                    size='sm'
                />
            ),
            Ingress: ({ children, ...props }: IngressProps) => (
                <Ingress
                    asChild
                    {...props}
                    size={'md'}
                >
                    <div>{children}</div>
                </Ingress>
            ),
            a: ({ children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
                if (rest.href?.startsWith('http')) {
                    return (
                        <ExternalLink {...rest}>
                            {children}
                        </ExternalLink>
                    );
                } else if (rest.href?.startsWith('/docs')) {
                    return (
                        <Link
                            {...rest}
                            href={`/${locale}${rest.href}`}
                        >
                            {children}
                        </Link>
                    );
                } else {
                    return <Link {...rest}>{children}</Link>;
                }
            },
            code: ({ className, ...rest }: React.HTMLAttributes<HTMLElement>) => {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                    // @ts-expect-error: ignore complaint that vscDarkPlus does not conform to CSSProperties
                    <SyntaxHighlighter
                        style={vscDarkPlus as any}
                        language={match[1]}
                        PreTag='div'
                        {...rest}
                    />
                ) : (
                    <code
                        className={className}
                        {...rest}
                    />
                );
            },
        };

        // Compile MDX and extract content
        const { content, frontmatter } = await compileMDX({
            source,
            options: {
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                },
                parseFrontmatter: true,
            },
            components,
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
