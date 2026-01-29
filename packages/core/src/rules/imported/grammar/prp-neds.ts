import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he neds (needs)
 * 
 * Source: LanguageTool (PRP_NEDS)
 * Category: grammar
 */
export const prpNedsRule: GrammarRule = {
  id: 'prp-neds',
  name: 'he neds (needs)',
  description: 'Did you mean (= verb)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI|you|s?he|we|they|it\b\s+\S+\s+\bneds?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean (= verb)?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
