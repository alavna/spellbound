import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in tact (intact)
 * 
 * Source: LanguageTool (IN_TACT)
 * Category: grammar
 */
export const inTactRule: GrammarRule = {
  id: 'in-tact',
  name: 'in tact (intact)',
  description: 'Did you mean intact?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btact\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean intact?',
        suggestions: ["intact"],
      });
    }
    
    return issues;
  },
};
