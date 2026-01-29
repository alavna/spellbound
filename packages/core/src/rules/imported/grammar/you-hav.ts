import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * you hav (have)
 * 
 * Source: LanguageTool (YOU_HAV)
 * Category: grammar
 */
export const youHavRule: GrammarRule = {
  id: 'you-hav',
  name: 'you hav (have)',
  description: 'Did you mean have?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byou|they|I|we\b\s+\S+\s+\bhav\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean have?',
        suggestions: ["have"],
      });
    }
    
    return issues;
  },
};
