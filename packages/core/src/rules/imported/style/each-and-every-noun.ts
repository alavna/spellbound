import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * each and every (every)
 * 
 * Source: LanguageTool (EACH_AND_EVERY_NOUN)
 * Category: style
 */
export const eachAndEveryNounRule: GrammarRule = {
  id: 'each-and-every-noun',
  name: 'each and every (every)',
  description: 'Replace with \\3 \\4',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\beach\b\s+\band\b\s+\bevery\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Replace with \\3 \\4',
        suggestions: ["\\3 \\4"],
      });
    }
    
    return issues;
  },
};
