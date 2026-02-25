import React from 'react';
import ReactMarkdown from 'react-markdown';
import { i18n, type LocaleCodes } from '@fdk-frontend/localization';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from './components';

export const defaultAllowedElements = [
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'blockquote',
    'pre',
    'code',
    'ul',
    'ol',
    'li',
    'hr',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'a',
    'strong',
    'em',
    'img',
    'br',
    'del',
    'span',
];

export const noHeadings = [
    'p',
    'blockquote',
    'pre',
    'code',
    'ul',
    'ol',
    'li',
    'hr',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'a',
    'strong',
    'em',
    'img',
    'br',
    'del',
    'span',
];

export type MarkdownProps = {
    locale?: LocaleCodes;
    className?: string;
    children?: string;
    allowedElements?: string[];
    components?: any;
};

const Markdown = ({
    allowedElements = defaultAllowedElements,
    components = {},
    locale = i18n.defaultLocale,
    ...rest
}: MarkdownProps) => {
    return (
        <ReactMarkdown
            allowedElements={allowedElements}
            remarkPlugins={[remarkGfm]}
            components={{
                ...mdxComponents({ locale }),
                ...components,
            }}
            {...rest}
        />
    );
};

export default Markdown;
