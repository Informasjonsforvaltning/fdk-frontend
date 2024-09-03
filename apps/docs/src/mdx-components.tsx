import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, coldarkDark, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    code: (props) => (
      <SyntaxHighlighter language="sparql" style={vscDarkPlus}>
        {props.children}
      </SyntaxHighlighter>
    ),
    ...components,
  }
}