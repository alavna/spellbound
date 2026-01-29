import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * flag ship (flagship)
 * 
 * Source: LanguageTool (FLAG_SHIP)
 * Category: grammar
 */
export const flagShipRule: GrammarRule = {
  id: 'flag-ship',
  name: 'flag ship (flagship)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bflag\b\s+\bships?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
