import { marked } from 'marked';

const stripFrontmatter = (str) => str.replace(/^---[\s\S]*?---\s*/, '');

/**
 * Extracts headlines from markdown and returns a nested structure.
 * @param {string} markdown - The raw markdown source.
 * @returns {Array} - A nested array of headlines with their levels.
 */
function extractHeadlines(markdown) {
    const markdownWithoutFrontmatter = stripFrontmatter(markdown);
    const tokens = marked.lexer(markdownWithoutFrontmatter);
    const headlines = [];

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
function extractHeadingText(token) {
    // Check if the heading token has nested tokens and if it's a link
    if (token.tokens && token.tokens.length > 0) {
        const linkToken = token.tokens.find((t) => t.type === 'link');
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
function buildNestedHeadlines(headlines) {
    const stack = [];
    const nestedHeadlines = [];

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
