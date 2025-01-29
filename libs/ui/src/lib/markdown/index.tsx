import ReactMarkdown from 'react-markdown';
import { Link } from '@digdir/designsystemet-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
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
	allowedElements?: string[];
	components?: any;
}

const Markdown = ({ allowedElements = defaultAllowedElements, components, ...props }: MarkdownProps) => {
	return (
		<ReactMarkdown
			allowedElements={allowedElements}
			components={{
          a: (props: LinkProps) => <Link {...props} />,
          code: ({ className, ...rest }: React.HTMLAttributes<HTMLElement>) => {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                  // @ts-expect-error: ignore complaint that vscDarkPlus does not conform to CSSProperties
                  (<SyntaxHighlighter
                      style={vscDarkPlus as any}
                      language={match[1]}
                      PreTag='div'
                      {...rest}
                  />)
              ) : (
                  (<SyntaxHighlighter
                      style={vscDarkPlus as any}
                      PreTag='div'
                      {...rest}
                  />)
              );
          },
          ...components
      }}
			{...props}
		/>
	);
};

export default Markdown;
