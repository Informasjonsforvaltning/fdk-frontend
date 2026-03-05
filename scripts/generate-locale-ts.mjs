#!/usr/bin/env node
/**
 * Generates libs/localization locale structure: one directory per locale with
 * sections/ subdir (one .ts per section) and index.ts that composes them.
 * Source: libs/dictionaries JSON. Run from repo root: node scripts/generate-locale-ts.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const dictDir = path.join(repoRoot, 'libs/dictionaries/src/lib/dictionaries');
const localesDir = path.join(repoRoot, 'libs/localization/src/lib/locales');

const sectionFiles = [
  ['common', 'common'],
  ['detailsPage', 'details-page'],
  ['docs', 'docs'],
  ['frontpage', 'frontpage'],
  ['sparqlSandboxPage', 'sparql-sandbox-page'],
  ['dataHunterPage', 'data-hunter-page'],
];

function stringifyForTs(obj, indent = 0) {
  const pad = '  '.repeat(indent);
  if (obj === null) return 'null';
  if (typeof obj !== 'object') {
    if (typeof obj === 'string') return JSON.stringify(obj);
    return String(obj);
  }
  if (Array.isArray(obj)) {
    const items = obj.map((v) => '  '.repeat(indent + 1) + stringifyForTs(v, indent + 1));
    return '[\n' + items.join(',\n') + '\n' + pad + ']';
  }
  const entries = Object.entries(obj).map(([k, v]) => {
    const key = /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(k) ? k : JSON.stringify(k);
    return pad + '  ' + key + ': ' + stringifyForTs(v, indent + 1);
  });
  return '{\n' + entries.join(',\n') + '\n' + pad + '}';
}

for (const locale of ['nb', 'nn', 'en']) {
  const localeDir = path.join(localesDir, locale);
  const sectionsDir = path.join(localeDir, 'sections');
  fs.mkdirSync(sectionsDir, { recursive: true });

  const sectionImports = [];
  const sectionEntries = [];

  for (const [sectionKey, fileName] of sectionFiles) {
    const filePath = path.join(dictDir, locale, fileName + '.json');
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);

    const varName = fileName.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/-/g, '');
    const sectionTs =
      `const ${varName} = ` + stringifyForTs(data) + `;\n\nexport default ${varName};\n`;
    const sectionPath = path.join(sectionsDir, fileName + '.ts');
    fs.writeFileSync(sectionPath, sectionTs, 'utf-8');
    sectionImports.push(`import ${varName} from './sections/${fileName}';`);
    sectionEntries.push(`  ${sectionKey}: ${varName},`);
  }

  const indexTs =
    `import type { Localization } from '../../types';

${sectionImports.join('\n')}

const localization: Localization = {
${sectionEntries.join('\n')}
};

export default localization;
`;

  fs.writeFileSync(path.join(localeDir, 'index.ts'), indexTs, 'utf-8');
  console.log('Wrote', locale + '/');
}

console.log('Done.');
