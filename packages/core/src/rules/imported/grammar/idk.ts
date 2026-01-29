import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * idk (IDK)
 * 
 * Source: LanguageTool (IDK)
 * Category: grammar
 */
export const idkRule: GrammarRule = {
  id: 'idk',
  name: 'idk (IDK)',
  description: 'Did you mean the abbreviation for \"I don\'t know\"?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Ii]dk\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the abbreviation for \"I don\'t know\"?',
        suggestions: ["IDK","I don't know"],
      });
    }
    
    return issues;
  },
};
