import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * must (most) of
 * 
 * Source: LanguageTool (MUST_MOST)
 * Category: grammar
 */
export const mustMostRule: GrammarRule = {
  id: 'must-most',
  name: 'must (most) of',
  description: 'Did you mean most of or must have?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmust\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean most of or must have?',
        suggestions: ["most of","must have"],
      });
    }
    
    return issues;
  },
};
