import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * too DETERMINER
 * 
 * Source: LanguageTool (TOO_DETERMINER)
 * Category: grammar
 */
export const tooDeterminerRule: GrammarRule = {
  id: 'too-determiner',
  name: 'too DETERMINER',
  description: 'Did you mean to ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btoo\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to ?',
        suggestions: ["to"],
      });
    }
    
    return issues;
  },
};
