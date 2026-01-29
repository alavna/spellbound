import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'I am' + non-gerund form
 * 
 * Source: LanguageTool (I_A_NONBASE)
 * Category: grammar
 */
export const iANonbaseRule: GrammarRule = {
  id: 'i-a-nonbase',
  name: '\'I am\' + non-gerund form',
  description: 'You might need to use the gerund form of the verb here (e.g. \'learning\' instead of \'learn\').',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI\b\s+\bam\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'You might need to use the gerund form of the verb here (e.g. \'learning\' instead of \'learn\').',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
