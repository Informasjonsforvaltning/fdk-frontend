import cn from 'classnames';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import Markdown from '@fdk-frontend/ui/markdown';

import {
    Heading,
    Button,
    Link,
    Tag,
    HelpText,
    Table,
    TableHead,
    TableBody,
    TableHeaderCell,
    TableCell,
    TableRow,
    Tabs,
    TabList,
    Tab,
    TabContent,
    Paragraph,
    ChipGroup,
    ChipToggle,
} from '@digdir/designsystemet-react';

const allowedElements = [
  'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code',
  'ul', 'ol', 'li', 'hr', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'a', 'strong', 'em', 'img', 'br', 'del', 'span'
];

const DatasetDescription = ({ className, children }) => {
	return (
		<article className={className}>
        <Markdown
        	allowedElements={allowedElements}
        	components={{
        		a: (props) => <Link {...props} />
        	}}
       	>
        	{children}
        </Markdown>
    </article>
	);
}

export default DatasetDescription;