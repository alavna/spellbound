import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * its JJ NN (possessive)
 * 
 * Source: LanguageTool (ITS_JJ_NNSNN)
 * Category: grammar
 */
export const itsJjNnsnnRule: GrammarRule = {
  id: 'its-jj-nnsnn',
  name: 'its JJ NN (possessive)',
  description: '&its;',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bit\b\s+'s\b/gi;
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
