import type { Meta, StoryObj } from '@storybook/react';

import ExpandableContent from '.';
import Box from '../box';
import Markdown from '../markdown';

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

const meta: Meta<typeof ExpandableContent> = {
    component: ExpandableContent,
    title: 'ExpandableContent',
};

export default meta;
type Story = StoryObj<typeof ExpandableContent>;

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
                    <ExpandableContent maxHeight={100}>
                        <Markdown>{markdown}</Markdown>
                    </ExpandableContent>
                </Box>
            </div>
        </>
    ),
};
