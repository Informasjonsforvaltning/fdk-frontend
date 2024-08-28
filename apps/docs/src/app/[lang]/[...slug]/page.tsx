import fs from "node:fs/promises";
import path from "node:path";
import slugify from 'slugify';

import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote, compileMDX } from 'next-mdx-remote/rsc';
import { marked } from 'marked';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Ingress, Alert, Link, Heading, Paragraph } from '@digdir/designsystemet-react';
import { i18n, type Locale, getDictionary } from '@fdk-frontend/dictionaries';

import MdxPage from '../../components/mdx-page';
import MdxHeading from '../../components/mdx-heading';

const contentSource = "src/app/content";

export type DocsPageType = {
  params: {
    lang: Locale;
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
    const source = await fs.readFile(filePath, "utf8");

    // Prepare client component map for MDX compilation
    const components = {
      h1: (props) => <MdxHeading level={1} {...props} />,
      h2: (props) => <MdxHeading level={2} {...props} />,
      h3: (props) => <MdxHeading level={3} {...props} />,
      h4: (props) => <MdxHeading level={4} {...props} />,
      h5: (props) => <MdxHeading level={5} {...props} />,
      h6: (props) => <MdxHeading level={6} {...props} />,
      Alert,
      Ingress: ({ size = 'xs', ...rest }) => (<Ingress size={size} {...rest} />),
      // h1: (props) => (<Heading {...props} />),
      a: (props) => (<Link {...props} href={`/${locale}${props.href}`} />),
      code: ({ children }) => (
        <SyntaxHighlighter language="sparql" style={vscDarkPlus}>
          {children}
        </SyntaxHighlighter>
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
        sidebars={frontmatter.sidebars}
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
export async function generateMetadata(
  { params }: DocsPageType,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const locale = params.lang ?? i18n.defaultLocale;
  const pageName = params.slug.at(-1);
  const filePath = path.resolve(process.cwd(), contentSource, ...params.slug, `${pageName}.${locale}.mdx`);

  try {
    const source = await fs.readFile(filePath, "utf8");

    const { frontmatter } = await compileMDX({
      source,
      options: { parseFrontmatter: true },
    });

    return {
      title: `${frontmatter.title} - data.norge.no`,
      description: frontmatter.description,
    };
  } catch (err) {
    notFound();
  }
}
