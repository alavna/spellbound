import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * for its NN (possessive)
 * 
 * Source: LanguageTool (FOR_ITS_NN)
 * Category: grammar
 */
export const forItsNnRule: GrammarRule = {
  id: 'for-its-nn',
  name: 'for its NN (possessive)',
  description: '&its;',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfor\b\s+\bit\b\s+'s\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '&its;',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
