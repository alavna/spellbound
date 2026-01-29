import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * different tact (tack)
 * 
 * Source: LanguageTool (DIFFERENT_TACT)
 * Category: grammar
 */
export const differentTactRule: GrammarRule = {
  id: 'different-tact',
  name: 'different tact (tack)',
  description: 'Did you mean different tack?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdifferent\b\s+\btact\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean different tack?',
        suggestions: ["different tack"],
      });
    }
    
    return issues;
  },
};
