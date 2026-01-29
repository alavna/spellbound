import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * be wilder (bewilder)
 * 
 * Source: LanguageTool (BE_COMPOUNDS)
 * Category: grammar
 */
export const beCompoundsRule: GrammarRule = {
  id: 'be-compounds',
  name: 'be wilder (bewilder)',
  description: 'This word is normally spelled as one.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbe\b\s+\bwilder(ed|edly|ing|ingly|s|ment)?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled as one.',
        suggestions: ["be"],
      });
    }
    
    return issues;
  },
};
