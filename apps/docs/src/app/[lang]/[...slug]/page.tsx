import fs from 'node:fs/promises';
import path from 'node:path';
import slugify from 'slugify';

import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote, compileMDX } from 'next-mdx-remote/rsc';
import { marked } from 'marked';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Ingress, type IngressProps, Alert, Button, Link, Heading, Paragraph } from '@digdir/designsystemet-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { i18n, type LocaleCodes, getDictionary } from '@fdk-frontend/dictionaries';

import MdxPage from '../../components/mdx-page';
import MdxHeading from '../../components/mdx-heading';
import CatalogPromo from '../../components/catalog-promo';

const contentSource = 'src/app/content';

export type DocsPageType = {
    params: {
        lang: LocaleCodes;
        slug: string[];
    };
};

export default async function Page({ params }: DocsPageType) {
    const locale = params.lang ?? i18n.defaultLocale;
    const pageName = params.slug.at(-1);

    // Construct .mdx filepath based on URL slug and locale
    const filePath = path.resolve(process.cwd(), contentSource, ...params.slug, `${pageName}.${locale}.mdx`);

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
            Alert,
            Button,
            Link,
            CatalogPromo,
            Ingress: ({ size = 'xs', ...rest }: IngressProps) => (
                <Ingress
                    asChild
                    size={size}
                    {...rest}
                />
            ),
            a: ({ children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
                if (rest.href?.startsWith('http')) {
                    return (
                        <Link {...rest}>
                            {children}
                            <ExternalLinkIcon fontSize='1em' />
                        </Link>
                    );
                } else {
                    return (
                        <Link
                            {...rest}
                            href={`/${locale}${rest.href}`}
                        >
                            {children}
                        </Link>
                    );
                }
            },
            code: ({ children }: React.HTMLAttributes<HTMLElement>) => (
                <SyntaxHighlighter
                    language='sparql'
                    style={vscDarkPlus}
                    children={children as any}
                />
            ),
        };

        // Compile MDX and extract content
        const { content, frontmatter } = await compileMDX({
            source,
            options: { parseFrontmatter: true },
            components,
        });

        const { FDK_BASE_URI: baseUri = '' } = process.env;

        // Render page
        return (
            <MdxPage
                sidebars={frontmatter.sidebars as boolean | undefined}
                slug={params.slug}
                locale={locale}
                baseUri={baseUri}
                source={source}
            >
                {content}
            </MdxPage>
        );
    } catch (err) {
        notFound();
    }
}

/**
 * In generateMetadata we do exactly the same as in the Page component,
 * except we extract frontmatter instead of content from MDX compilation
 */
export async function generateMetadata({ params }: DocsPageType, parent: ResolvingMetadata): Promise<Metadata> {
    const locale = params.lang ?? i18n.defaultLocale;
    const pageName = params.slug.at(-1);
    const filePath = path.resolve(process.cwd(), contentSource, ...params.slug, `${pageName}.${locale}.mdx`);

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
    } catch (err) {
        notFound();
    }
}