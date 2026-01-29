import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * at the reigns (reins)
 * 
 * Source: LanguageTool (AT_THE_REIGNS)
 * Category: grammar
 */
export const atTheReignsRule: GrammarRule = {
  id: 'at-the-reigns',
  name: 'at the reigns (reins)',
  description: 'Did you mean the reins?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bat|hand|held|holds?|holding\b\s+\bthe\b\s+\breigns\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the reins?',
        suggestions: ["the reins"],
      });
    }
    
    return issues;
  },
};
