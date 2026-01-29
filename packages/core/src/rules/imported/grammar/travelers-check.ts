import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * traveler's check
 * 
 * Source: LanguageTool (TRAVELERS_CHECK)
 * Category: grammar
 */
export const travelersCheckRule: GrammarRule = {
  id: 'travelers-check',
  name: 'traveler\'s check',
  description: 'Did you mean \\2 (= exchange medium, payment)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btravell?ers?\s+\bchecks?|cheques?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\2 (= exchange medium, payment)?',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
