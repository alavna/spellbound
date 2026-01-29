import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Comma after 'Oh my god'
 * 
 * Source: LanguageTool (GOD_COMMA)
 * Category: grammar
 */
export const godCommaRule: GrammarRule = {
  id: 'god-comma',
  name: 'Comma after \'Oh my god\'',
  description: 'It seems that a comma is missing after this introductory phrase.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bGods?|goodness|goddess|gosh|allah|lord|days|word|stars\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It seems that a comma is missing after this introductory phrase.',
        suggestions: ["\\5,"],
      });
    }
    
    return issues;
  },
};
