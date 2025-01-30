import React from 'react';
import cn from 'classnames';
import ReactMarkdown from 'react-markdown';
import { Link, LinkProps } from '@digdir/designsystemet-react';
import { Prism as SyntaxHighlighter, SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
    'span'
];

export type MarkdownProps = {
  className?: string;
  children?: string;
	allowedElements?: string[];
	components?: any;
}

const Markdown = ({ allowedElements = defaultAllowedElements, components, ...rest }: MarkdownProps) => {
	return (
		<ReactMarkdown
			allowedElements={allowedElements}
			components={{
          a: (props: LinkProps) => <Link {...props} />,
          code: ({ className, ...props }: SyntaxHighlighterProps) => {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                  (<SyntaxHighlighter
                      style={vscDarkPlus as any}
                      language={match[1]}
                      PreTag='div'
                      {...props}
                  />)
              ) : (
                  (<SyntaxHighlighter
                      style={vscDarkPlus as any}
                      PreTag='div'
                      {...props}
                  />)
              );
          },
          ...components
      }}
			{...rest}
		/>
	);
};

export default Markdown;
