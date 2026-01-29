#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function toCamelCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/-([a-z0-9])/gi, (_, char) => char.toUpperCase())
    .replace(/^[A-Z]/, (letter) => letter.toLowerCase())
    .replace(/^[0-9]/, (num) => '_' + num);
}

const dir = process.argv[2];
if (!dir) {
  console.error('Usage: node regen-index.cjs <directory>');
  process.exit(1);
}

const categoryName = path.basename(dir);
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.ts') && f !== 'index.ts');

const importLines = files
  .map((f) => {
    const id = f.replace('.ts', '');
    return `import { ${toCamelCase(id)}Rule } from './${id}';`;
  })
  .join('\n');

const exportLines = files
  .map((f) => {
    const id = f.replace('.ts', '');
    return `  ${toCamelCase(id)}Rule,`;
  })
  .join('\n');

const content = `/**
 * ${categoryName.toUpperCase()} Rules
 * Imported from LanguageTool
 * Total: ${files.length} rules
 */

${importLines}

export const ${toCamelCase(categoryName)}Rules = [
${exportLines}
];

export default ${toCamelCase(categoryName)}Rules;
`;

fs.writeFileSync(path.join(dir, 'index.ts'), content);
console.log(`Generated ${categoryName}/index.ts with ${files.length} rules`);
