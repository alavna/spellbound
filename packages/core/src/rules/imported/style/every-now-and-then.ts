import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * every now and then (now and then)
 * 
 * Source: LanguageTool (EVERY_NOW_AND_THEN)
 * Category: style
 */
export const everyNowAndThenRule: GrammarRule = {
  id: 'every-now-and-then',
  name: 'every now and then (now and then)',
  description: 'Consider an alternative to strengthen your wording.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bevery\b\s+\bnow\b\s+\band\b\s+\bthen\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider an alternative to strengthen your wording.',
        suggestions: ["sometimes","occasionally","sporadically","\\2 \\3 \\4"],
      });
    }
    
    return issues;
  },
};
