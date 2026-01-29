import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * whos NN (possessive)
 * 
 * Source: LanguageTool (WHOS_NN)
 * Category: grammar
 */
export const whosNnRule: GrammarRule = {
  id: 'whos-nn',
  name: 'whos NN (possessive)',
  description: 'Did you mean whose ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwho\b\s+'s\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean whose ?',
        suggestions: ["whose"],
      });
    }
    
    return issues;
  },
};
