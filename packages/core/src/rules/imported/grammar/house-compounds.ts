import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * house hold (household)
 * 
 * Source: LanguageTool (HOUSE_COMPOUNDS)
 * Category: grammar
 */
export const houseCompoundsRule: GrammarRule = {
  id: 'house-compounds',
  name: 'house hold (household)',
  description: 'The word house is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhouse\b\s+\bwife|wives|holds?|work|boats?|breakers?|keepers?|masters?|holders?|fathers?|dress(es)?|boaters?|mothers?|keeping|persons?|wifery|parents?|rooms?|maids?|leeks?|fly|flies|bound\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word house is normally spelled as one word.',
        suggestions: ["house"],
      });
    }
    
    return issues;
  },
};
