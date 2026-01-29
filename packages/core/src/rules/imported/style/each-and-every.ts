import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * each and every one (each one)
 * 
 * Source: LanguageTool (EACH_AND_EVERY)
 * Category: style
 */
export const eachAndEveryRule: GrammarRule = {
  id: 'each-and-every',
  name: 'each and every one (each one)',
  description: 'Consider using \\1 \\4.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\beach\b\s+\band\b\s+\bevery\b\s+\bone\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\1 \\4.',
        suggestions: ["\\1 \\4"],
      });
    }
    
    return issues;
  },
};
