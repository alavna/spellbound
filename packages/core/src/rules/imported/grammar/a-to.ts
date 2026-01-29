import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a to
 * 
 * Source: LanguageTool (A_TO)
 * Category: grammar
 */
export const aToRule: GrammarRule = {
  id: 'a-to',
  name: 'a to',
  description: 'A noun might be missing after either \'\\1\' or \'\\2\' (if \'to\' is used as a preposition).',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'A noun might be missing after either \'\\1\' or \'\\2\' (if \'to\' is used as a preposition).',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
