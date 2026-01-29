import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * to VB its NN (possessive)
 * 
 * Source: LanguageTool (TO_VB_ITS_NN)
 * Category: grammar
 */
export const toVbItsNnRule: GrammarRule = {
  id: 'to-vb-its-nn',
  name: 'to VB its NN (possessive)',
  description: '&its;',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bto\b\s+\S+\s+\bit\b\s+'s\b/gi;
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
