import type { Meta, StoryObj } from '@storybook/react';

import Markdown from '.';
import Article from '../article';
import Box from '../box';

const meta: Meta<typeof Markdown> = {
    component: Markdown,
    title: 'Markdown',
};

const markdown = `
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

---

> This is a blockquote.

Here is some **bold text**, *italic text*, and ~~strikethrough text~~.

A line break follows:  
This is on a new line.

A [link to OpenAI](https://openai.com).

An inline \`code\` snippet.

\`\`\`javascript
console.log("Hello, Markdown!");
\`\`\`

- Unordered list item 1
- Unordered list item 2

1. Ordered list item 1
2. Ordered list item 2

| Table Header 1 | Table Header 2 |
|---------------|---------------|
| Row 1, Cell 1 | Row 1, Cell 2 |
| Row 2, Cell 1 | Row 2, Cell 2 |

An image:  
![Alt text](https://via.placeholder.com/150)

A <span style="color: red;">red span</span> (if HTML is supported).
`;

export default meta;
type Story = StoryObj<typeof Markdown>;

export const Primary: Story = {
    parameters: {
        nextjs: {
            appDirectory: true,
        },
    },
    render: () => (
        <>
            <div style={{ padding: '1rem' }}>
                <Box>
                    <Article>
                        <Markdown>{markdown}</Markdown>
                    </Article>
                </Box>
            </div>
        </>
    ),
};
