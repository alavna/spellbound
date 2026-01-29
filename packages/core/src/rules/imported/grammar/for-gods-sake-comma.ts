import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Comma after 'for god's sake
 * 
 * Source: LanguageTool (FOR_GODS_SAKE_COMMA)
 * Category: grammar
 */
export const forGodsSakeCommaRule: GrammarRule = {
  id: 'for-gods-sake-comma',
  name: 'Comma after \'for god\'s sake',
  description: 'It seems that a comma is missing after this introductory phrase.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bin|for\b\s+\bgod|allah|fuck|hell|christ|heaven|goodness|goddess\b\s+'s\b\s+\bhand|name|sake|will|country\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It seems that a comma is missing after this introductory phrase.',
        suggestions: ["\\6,"],
      });
    }
    
    return issues;
  },
};
