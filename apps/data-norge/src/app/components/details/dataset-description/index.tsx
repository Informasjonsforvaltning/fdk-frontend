import { PropsWithChildren } from 'react';

import { Link, type LinkProps } from '@digdir/designsystemet-react';

import Markdown from '@fdk-frontend/ui/markdown';

const allowedElements = [
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

type Props = PropsWithChildren & {
    className?: string;
};

const DatasetDescription = ({ className, children }: Props) => {
    return (
        <article className={className}>
            <Markdown
                allowedElements={allowedElements}
                components={{
                    a: (props: LinkProps) => <Link {...props} />,
                }}
            >
                {children}
            </Markdown>
        </article>
    );
};

export default DatasetDescription;
