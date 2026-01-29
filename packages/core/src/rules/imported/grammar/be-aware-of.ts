import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Need to (be) aware of
 * 
 * Source: LanguageTool (BE_AWARE_OF)
 * Category: grammar
 */
export const beAwareOfRule: GrammarRule = {
  id: 'be-aware-of',
  name: 'Need to (be) aware of',
  description: 'It appears that a verb is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bto|will|should|can|could|must\b\s+\baware\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a verb is missing.',
        suggestions: ["be \\2"],
      });
    }
    
    return issues;
  },
};
