import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * apart form (apart from)
 * 
 * Source: LanguageTool (APART_FORM)
 * Category: grammar
 */
export const apartFormRule: GrammarRule = {
  id: 'apart-form',
  name: 'apart form (apart from)',
  description: 'Possible typo. Did you mean apart from?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bapart\b\s+\bform\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible typo. Did you mean apart from?',
        suggestions: ["apart from"],
      });
    }
    
    return issues;
  },
};
