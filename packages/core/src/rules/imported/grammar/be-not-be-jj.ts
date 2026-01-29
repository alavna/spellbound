import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I am not (be) in the office
 * 
 * Source: LanguageTool (BE_NOT_BE_JJ)
 * Category: grammar
 */
export const beNotBeJjRule: GrammarRule = {
  id: 'be-not-be-jj',
  name: 'I am not (be) in the office',
  description: 'It seems that the verb \"be\" is not needed here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\byes\b\s+\bbe\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It seems that the verb \"be\" is not needed here.',
        suggestions: ["\\4"],
      });
    }
    
    return issues;
  },
};
