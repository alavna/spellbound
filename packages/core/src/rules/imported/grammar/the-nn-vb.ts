import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * we + ... + are + base form verb (gerund)
 * 
 * Source: LanguageTool (THE_NN_VB)
 * Category: grammar
 */
export const theNnVbRule: GrammarRule = {
  id: 'the-nn-vb',
  name: 'we + ... + are + base form verb (gerund)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bthe\b/gi;
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
