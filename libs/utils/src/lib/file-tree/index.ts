// lib/recursivelyGetMdxFiles.js
import fs from 'fs';
import path from 'path';

export function getMDXFilesMap(dir) {
    const files = recursivelyGetMdxFiles(dir);
    let filesPrefixed = files.map((file) => path.join(path.basename(dir), file));
    return getNestedMapFromPathnames(filesPrefixed);
}

// Recursive function to get all MDX files from the specified directory
export function recursivelyGetMdxFiles(dirPath, basePath = '') {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    let mdxFiles = [];

    entries.forEach((entry) => {
        const fullPath = path.join(dirPath, entry.name);
        const relativePath = path.join(basePath, entry.name);

        if (entry.isDirectory()) {
            mdxFiles = [...mdxFiles, ...recursivelyGetMdxFiles(fullPath, relativePath)];
        } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
            mdxFiles.push(relativePath);
        }
    });

    return mdxFiles;
}

export function getNestedMapFromPathnames(paths) {
    const pathMap = {};

    paths.forEach((path) => {
        const parts = path.split('/').slice(0, -1); // Remove the filename

        // console.log(parts);

        let currentLevel = pathMap;

        parts.forEach((part) => {
            if (!currentLevel[part]) {
                currentLevel[part] = {};
            }
            currentLevel = currentLevel[part];
        });
    });

    return pathMap;
}
