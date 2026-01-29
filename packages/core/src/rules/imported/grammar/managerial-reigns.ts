import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * managerial reigns (reins)
 * 
 * Source: LanguageTool (MANAGERIAL_REIGNS)
 * Category: grammar
 */
export const managerialReignsRule: GrammarRule = {
  id: 'managerial-reigns',
  name: 'managerial reigns (reins)',
  description: 'Did you mean managerial reins?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmanagerial\b\s+\breigns\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean managerial reins?',
        suggestions: ["managerial reins"],
      });
    }
    
    return issues;
  },
};
