import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * if which (if, which)
 * 
 * Source: LanguageTool (IF_WHICH)
 * Category: grammar
 */
export const ifWhichRule: GrammarRule = {
  id: 'if-which',
  name: 'if which (if, which)',
  description: 'One of these words is redundant, or a comma is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bif\b\s+\bwhich\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'One of these words is redundant, or a comma is missing.',
        suggestions: ["which","if","if, which"],
      });
    }
    
    return issues;
  },
};
