import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he bough (bought)
 * 
 * Source: LanguageTool (PRP_BOUGH)
 * Category: grammar
 */
export const prpBoughRule: GrammarRule = {
  id: 'prp-bough',
  name: 'he bough (bought)',
  description: 'Did you mean the verb bought (= past tense of \"to buy\")?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it|they|I|we|you\b\s+\S+\s+\bbough\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb bought (= past tense of \"to buy\")?',
        suggestions: ["bought"],
      });
    }
    
    return issues;
  },
};
