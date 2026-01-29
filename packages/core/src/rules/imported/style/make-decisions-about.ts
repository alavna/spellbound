import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * make decisions about (decide on)
 * 
 * Source: LanguageTool (MAKE_DECISIONS_ABOUT)
 * Category: style
 */
export const makeDecisionsAboutRule: GrammarRule = {
  id: 'make-decisions-about',
  name: 'make decisions about (decide on)',
  description: 'Did you mean decide on?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmake\b\s+\byes\b\s+\babout\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean decide on?',
        suggestions: ["decide on"],
      });
    }
    
    return issues;
  },
};
