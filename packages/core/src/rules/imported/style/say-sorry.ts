import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * say sorry (apologize)
 * 
 * Source: LanguageTool (SAY_SORRY)
 * Category: style
 */
export const saySorryRule: GrammarRule = {
  id: 'say-sorry',
  name: 'say sorry (apologize)',
  description: 'Consider using apologize to improve your wording.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bsorry\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using apologize to improve your wording.',
        suggestions: ["apologize"],
      });
    }
    
    return issues;
  },
};
