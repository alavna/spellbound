import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * o (to)
 * 
 * Source: LanguageTool (O_TO)
 * Category: grammar
 */
export const oToRule: GrammarRule = {
  id: 'o-to',
  name: 'o (to)',
  description: 'Did you mean to?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bo\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to?',
        suggestions: ["to"],
      });
    }
    
    return issues;
  },
};
