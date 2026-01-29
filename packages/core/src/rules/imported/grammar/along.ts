import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Thanks for taking me a long (along) for the ride
 * 
 * Source: LanguageTool (ALONG)
 * Category: grammar
 */
export const alongRule: GrammarRule = {
  id: 'along',
  name: 'Thanks for taking me a long (along) for the ride',
  description: 'Did you mean to use the preposition \'along\' here?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba\b\s+\blong\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to use the preposition \'along\' here?',
        suggestions: ["along"],
      });
    }
    
    return issues;
  },
};
