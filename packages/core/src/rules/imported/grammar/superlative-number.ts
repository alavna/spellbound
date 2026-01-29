import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * This is the most frequent errors (error)
 * 
 * Source: LanguageTool (SUPERLATIVE_NUMBER)
 * Category: grammar
 */
export const superlativeNumberRule: GrammarRule = {
  id: 'superlative-number',
  name: 'This is the most frequent errors (error)',
  description: 'The grammatical number of this noun might be incorrect. Did you mean to use the singular form here?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+'s|is|was\b\s+\bthe\b\s+\bmore|most\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The grammatical number of this noun might be incorrect. Did you mean to use the singular form here?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
