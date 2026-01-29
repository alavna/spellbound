import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * glady vs gladly
 * 
 * Source: LanguageTool (GLADY_GLADLY)
 * Category: grammar
 */
export const gladyGladlyRule: GrammarRule = {
  id: 'glady-gladly',
  name: 'glady vs gladly',
  description: 'Did you mean the adverb gladly?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bglady\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adverb gladly?',
        suggestions: ["gladly"],
      });
    }
    
    return issues;
  },
};
