import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * take awhile (a while)
 * 
 * Source: LanguageTool (TAKE_AWHILE)
 * Category: grammar
 */
export const takeAwhileRule: GrammarRule = {
  id: 'take-awhile',
  name: 'take awhile (a while)',
  description: 'Did you mean take a while?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btake\b\s+\bawhile\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean take a while?',
        suggestions: ["take a while"],
      });
    }
    
    return issues;
  },
};
