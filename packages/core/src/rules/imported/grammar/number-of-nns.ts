import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * number or (of)
 * 
 * Source: LanguageTool (NUMBER_OF_NNS)
 * Category: grammar
 */
export const numberOfNnsRule: GrammarRule = {
  id: 'number-of-nns',
  name: 'number or (of)',
  description: 'Did you mean of?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnumber\b\s+\bor\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean of?',
        suggestions: ["of"],
      });
    }
    
    return issues;
  },
};
