import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ne (né, me, no)
 * 
 * Source: LanguageTool (NE)
 * Category: grammar
 */
export const neRule: GrammarRule = {
  id: 'ne',
  name: 'ne (né, me, no)',
  description: 'Did you mean né, me, no, be?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bne\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean né, me, no, be?',
        suggestions: ["né","me","no","be"],
      });
    }
    
    return issues;
  },
};
