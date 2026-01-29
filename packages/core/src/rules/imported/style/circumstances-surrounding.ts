import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * circumstances surrounding (circumstances of)
 * 
 * Source: LanguageTool (CIRCUMSTANCES_SURROUNDING)
 * Category: style
 */
export const circumstancesSurroundingRule: GrammarRule = {
  id: 'circumstances-surrounding',
  name: 'circumstances surrounding (circumstances of)',
  description: 'This phrase is redundant. Consider writing of.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcircumstances\b\s+\bsurrounding\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase is redundant. Consider writing of.',
        suggestions: ["of"],
      });
    }
    
    return issues;
  },
};
