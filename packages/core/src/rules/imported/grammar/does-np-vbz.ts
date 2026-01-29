import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'does' ... 3rd person verb (base verb)
 * 
 * Source: LanguageTool (DOES_NP_VBZ)
 * Category: grammar
 */
export const doesNpVbzRule: GrammarRule = {
  id: 'does-np-vbz',
  name: '\'does\' ... 3rd person verb (base verb)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdoes\b\s+\.{L}+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
