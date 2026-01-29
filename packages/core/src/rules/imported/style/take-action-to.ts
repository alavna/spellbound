import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * take action to (omit)
 * 
 * Source: LanguageTool (TAKE_ACTION_TO)
 * Category: style
 */
export const takeActionToRule: GrammarRule = {
  id: 'take-action-to',
  name: 'take action to (omit)',
  description: 'Remove as verbose.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\baction\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Remove as verbose.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
