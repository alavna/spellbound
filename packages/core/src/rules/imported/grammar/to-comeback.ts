import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * to comeback (come back)
 * 
 * Source: LanguageTool (TO_COMEBACK)
 * Category: grammar
 */
export const toComebackRule: GrammarRule = {
  id: 'to-comeback',
  name: 'to comeback (come back)',
  description: 'Did you mean \\1 come back?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bto|had\b\s+\bcomeback\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 come back?',
        suggestions: ["\\1 come back"],
      });
    }
    
    return issues;
  },
};
