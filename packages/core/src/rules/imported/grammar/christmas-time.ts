import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Christmas time (Christmastime)
 * 
 * Source: LanguageTool (CHRISTMAS_TIME)
 * Category: grammar
 */
export const christmasTimeRule: GrammarRule = {
  id: 'christmas-time',
  name: 'Christmas time (Christmastime)',
  description: 'The noun Christmastime (= the Christmas season) is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bChristmas\b\s+\btime\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun Christmastime (= the Christmas season) is normally spelled as one word.',
        suggestions: ["Christmastime"],
      });
    }
    
    return issues;
  },
};
