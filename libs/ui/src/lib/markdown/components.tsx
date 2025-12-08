import React from 'react';
import Image from 'next/image';
import { type SyntaxHighlighterProps } from 'react-syntax-highlighter';
import {
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
import { type LocaleCodes, i18n } from '@fdk-frontend/dictionaries';
import ExternalLink from '../external-link';
import MdxHeading from '../mdx-heading';
import ConceptPreview, { type ConceptPreviewProps } from '../concept-preview';
import CodeBlockWrapper from './code-block-wrapper';

type MdxComponentMapProps = {
    locale: LocaleCodes;
};

export const mdxComponents = ({ locale = i18n.defaultLocale }: MdxComponentMapProps) => {
    return {
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
        p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <Paragraph {...props} />,
        Paragraph: (props: React.HTMLAttributes<HTMLParagraphElement>) => <Paragraph {...props} />,
        Heading: (props: HeadingProps) => <Heading {...props} />,
        Alert: ({ 'data-size': dataSize = 'sm', 'data-color': dataColor, ...props }: AlertProps) => (
            <Alert
                data-size={dataSize}
                data-color={dataColor}
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
        Image,
        table: ({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
            <Table {...(props as any)}>{children}</Table>
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
        th: ({ children, ...props }: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
            <TableHeaderCell {...props}>{children}</TableHeaderCell>
        ),
        td: ({ children, ...props }: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
            <TableCell {...props}>{children}</TableCell>
        ),
        Tag: (props: TagProps) => <Tag {...props} />,
        Ingress: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
            <Paragraph
                data-size='md'
                asChild={true}
                {...props}
            >
                <div>{children}</div>
            </Paragraph>
        ),
        a: ({ children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
            if (rest.href?.startsWith('http')) {
                return <ExternalLink {...rest}>{children}</ExternalLink>;
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
        code: ({ className, ...rest }: SyntaxHighlighterProps) => {
            const { children } = rest;
            const isBlock = typeof children === 'string' && children.includes('\n');
            const match = /language-(\w+)/.exec(className || '');

            if (isBlock) {
                return match ? (
                    <CodeBlockWrapper
                        locale={locale}
                        language={match[1]}
                        {...rest}
                    >
                        {children}
                    </CodeBlockWrapper>
                ) : (
                    <CodeBlockWrapper
                        locale={locale}
                        {...rest}
                    >
                        {children}
                    </CodeBlockWrapper>
                );
            }

            return (
                <code
                    className={className}
                    {...rest}
                />
            );
        },
    };
};
