import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import type { Nodes, Parents, Root } from "mdast";
import type { Node } from "unist";

const processor = unified().use(remarkParse).use(remarkGfm);

const omittedNodeTypes = new Set<Nodes["type"]>([
  "code",
  "definition",
  "footnoteDefinition",
  "html",
  "table",
  "thematicBreak",
  "yaml",
]);

const blocksWithTrailingSpace = new Set<Nodes["type"]>(["blockquote", "heading", "listItem", "paragraph"]);

const isRoot = (node: Node): node is Root => node.type === "root" && "children" in node;

const isParent = (node: Nodes): node is Parents => "children" in node;

const collectText = (node: Nodes, parts: string[]) => {
  if (node.type === "image" || node.type === "imageReference") {
    if (node.alt) parts.push(node.alt);
    return;
  }

  if (omittedNodeTypes.has(node.type)) return;

  if (node.type === "text" || node.type === "inlineCode") {
    parts.push(node.value);
    return;
  }

  if (node.type === "break") {
    parts.push(" ");
    return;
  }

  if (!isParent(node)) return;

  for (const child of node.children) {
    collectText(child, parts);
  }

  if (blocksWithTrailingSpace.has(node.type)) {
    parts.push(" ");
  }
};

/** Markdown with formatting removed, as a single line of text. Tables, code blocks, and raw HTML are left out. */
export const markdownToPlainText = (markdown: string): string => {
  const tree = processor.parse(markdown);
  if (!isRoot(tree)) return "";

  const parts: string[] = [];
  collectText(tree, parts);
  return parts.join("").replace(/\s+/g, " ").trim();
};
