/**
 * Grammar Rules - Imported from LanguageTool
 * 
 * LanguageTool - https://languagetool.org
 * License: LGPL 2.1
 * 
 * Total rules: 14,663
 * Categories: grammar, style, confusion, compounds
 * 
 * These rules were automatically converted from LanguageTool's XML format
 * and data files to Spellbound's TypeScript format.
 * Original rules © LanguageTool contributors.
 * 
 * Breakdown:
 * - Grammar rules: 1,562
 * - Style rules: 210
 * - Confusion rules: 4,352 (commonly confused word pairs)
 * - Compound rules: 8,539 (split compound words)
 */

import { grammarRules } from './grammar';
import { styleRules } from './style';
import { confusionRules } from './confusion';
import { compoundRules } from './compounds';

export const importedRules = [
  ...grammarRules,
  ...styleRules,
  ...confusionRules,
  ...compoundRules,
];

export { grammarRules } from './grammar';
export { styleRules } from './style';
export { confusionRules } from './confusion';
export { compoundRules } from './compounds';

export default importedRules;
