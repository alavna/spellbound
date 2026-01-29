import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * an + are
 * 
 * Source: LanguageTool (AN_ARE)
 * Category: grammar
 */
export const anAreRule: GrammarRule = {
  id: 'an-are',
  name: 'an + are',
  description: 'Did you mean and \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\baren?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean and \\2?',
        suggestions: ["and \\2"],
      });
    }
    
    return issues;
  },
};
