import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bald-headed (bald)
 * 
 * Source: LanguageTool (BALD-HEADED)
 * Category: style
 */
export const baldHeadedRule: GrammarRule = {
  id: 'bald-headed',
  name: 'bald-headed (bald)',
  description: 'Consider using bald.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbald-headed\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using bald.',
        suggestions: ["bald"],
      });
    }
    
    return issues;
  },
};
