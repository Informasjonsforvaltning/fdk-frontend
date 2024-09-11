import { marked } from 'marked';

const stripFrontmatter = (str: string) => str.replace(/^---[\s\S]*?---\s*/, '');

export type MdxHeadlineObject = {
    level: number;
    text: string;
};

export type MdxHeadlineObjectNode = MdxHeadlineObject & {
    children?: MdxHeadlineObjectNode[];
};

/**
 * Extracts headlines from markdown and returns a nested structure.
 * @param {string} markdown - The raw markdown source.
 * @returns {Array} - A nested array of headlines with their levels.
 */
function extractHeadlines(markdown: string) {
    const markdownWithoutFrontmatter = stripFrontmatter(markdown);
    const tokens = marked.lexer(markdownWithoutFrontmatter);
    const headlines: { level: number; text: string }[] = [];

    tokens.forEach((token) => {
        if (token.type === 'heading') {
            const text = extractHeadingText(token);
            headlines.push({ level: token.depth, text });
        }
    });

    return buildNestedHeadlines(headlines);
}

/**
 * Extracts the text from a heading token, handling nested link tokens.
 * @param {Object} token - The heading token.
 * @returns {string} - The extracted text.
 */
function extractHeadingText(token: any) {
    // Check if the heading token has nested tokens and if it's a link
    if (token.tokens && token.tokens.length > 0) {
        const linkToken = token.tokens.find((t: any) => t.type === 'link');
        if (linkToken) {
            return linkToken.text; // Return the text of the nested link token
        }
    }
    // Fallback to the heading's text if no nested link is found
    return token.text;
}

/**
 * Converts a flat array of headlines into a nested structure.
 * @param {Array} headlines - The flat array of headlines.
 * @returns {Array} - A nested array of headlines.
 */
function buildNestedHeadlines(headlines: MdxHeadlineObject[]) {
    const stack: any[] = [];
    const nestedHeadlines: any[] = [];

    headlines.forEach((headline) => {
        const { level, text } = headline;
        const node = { level, text, children: [] };

        // Maintain the stack to build a nested structure
        while (stack.length && stack[stack.length - 1].level >= level) {
            stack.pop();
        }

        if (stack.length === 0) {
            nestedHeadlines.push(node);
        } else {
            stack[stack.length - 1].children.push(node);
        }

        stack.push(node);
    });

    return nestedHeadlines;
}

export { extractHeadlines };
