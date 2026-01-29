import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * number (of) years
 * 
 * Source: LanguageTool (A_NUMBER_NNS)
 * Category: grammar
 */
export const aNumberNnsRule: GrammarRule = {
  id: 'a-number-nns',
  name: 'number (of) years',
  description: 'Did you mean \\3 of?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba\b\s+\bnumber\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\3 of?',
        suggestions: ["\\3 of"],
      });
    }
    
    return issues;
  },
};
