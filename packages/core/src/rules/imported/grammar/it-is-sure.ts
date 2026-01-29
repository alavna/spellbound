import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Collocation: it is sure/certain
 * 
 * Source: LanguageTool (IT_IS_SURE)
 * Category: grammar
 */
export const itIsSureRule: GrammarRule = {
  id: 'it-is-sure',
  name: 'Collocation: it is sure/certain',
  description: '\"It is sure\" is uncommon. Consider using certain.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bit\b\s+\byes\b\s+\bsure\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\"It is sure\" is uncommon. Consider using certain.',
        suggestions: ["certain"],
      });
    }
    
    return issues;
  },
};
