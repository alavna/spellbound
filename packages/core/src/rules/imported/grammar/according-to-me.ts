import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * according to me (in my opinion)
 * 
 * Source: LanguageTool (ACCORDING_TO_ME)
 * Category: grammar
 */
export const accordingToMeRule: GrammarRule = {
  id: 'according-to-me',
  name: 'according to me (in my opinion)',
  description: 'This phrase can sound awkward in English. Consider using in my opinion or I think.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\baccording\b\s+\bto\b\s+\bme\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase can sound awkward in English. Consider using in my opinion or I think.',
        suggestions: ["in my opinion","I think"],
      });
    }
    
    return issues;
  },
};
