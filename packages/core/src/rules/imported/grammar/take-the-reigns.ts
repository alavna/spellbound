import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * take the reigns (reins)
 * 
 * Source: LanguageTool (TAKE_THE_REIGNS)
 * Category: grammar
 */
export const takeTheReignsRule: GrammarRule = {
  id: 'take-the-reigns',
  name: 'take the reigns (reins)',
  description: 'Did you mean reins?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bthe\b\s+\breigns\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean reins?',
        suggestions: ["reins"],
      });
    }
    
    return issues;
  },
};
