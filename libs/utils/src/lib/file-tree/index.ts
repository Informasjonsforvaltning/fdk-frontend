// lib/getMdxFiles.js
import fs from 'fs';
import path from 'path';

// Recursive function to get all MDX files from the specified directory
export function getMdxFiles(dirPath, basePath = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  let mdxFiles = [];

  entries.forEach((entry) => {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      // Recursively get MDX files from subdirectories
      mdxFiles = [...mdxFiles, ...getMdxFiles(fullPath, relativePath)];
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      // If it's an MDX file, add it to the list
      // const routePath = relativePath.replace(/\.mdx$/, '');
      // mdxFiles.push(routePath);
      mdxFiles.push(relativePath);
    }
  });

  return mdxFiles;
}

export function getNestedMapFromPathnames(paths) {
  const pathMap = {};

  paths.forEach(path => {
      const parts = path.split('/').slice(0, -1); // Remove the filename
      let currentLevel = pathMap;

      parts.forEach(part => {
          if (!currentLevel[part]) {
              currentLevel[part] = {};
          }
          currentLevel = currentLevel[part];
      });
  });

  return pathMap;
}

export function fetchMdxPaths() {
  const mdxDirectory = path.join(process.cwd(), 'pages'); // Adjust to your MDX base directory
  return getMdxFiles(mdxDirectory);
}
