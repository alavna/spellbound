import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * to backout (back out)
 * 
 * Source: LanguageTool (TO_BACKOUT)
 * Category: grammar
 */
export const toBackoutRule: GrammarRule = {
  id: 'to-backout',
  name: 'to backout (back out)',
  description: 'Did you mean to back out?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bto\b\s+\bbackout\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to back out?',
        suggestions: ["to back out"],
      });
    }
    
    return issues;
  },
};
