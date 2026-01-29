import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ought + infinitive (ought to + infinitive)
 * 
 * Source: LanguageTool (OUGHT_SAY)
 * Category: grammar
 */
export const oughtSayRule: GrammarRule = {
  id: 'ought-say',
  name: 'ought + infinitive (ought to + infinitive)',
  description: 'Did you mean \\1 to \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bought\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 to \\2?',
        suggestions: ["\\1 to \\2"],
      });
    }
    
    return issues;
  },
};
