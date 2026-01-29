import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * safety (safe) deposit box
 * 
 * Source: LanguageTool (SAFETY_DEPOSIT_BOX)
 * Category: grammar
 */
export const safetyDepositBoxRule: GrammarRule = {
  id: 'safety-deposit-box',
  name: 'safety (safe) deposit box',
  description: 'Did you mean safe deposit box?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsafety\b\s+\bdeposit\b\s+\bbox\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean safe deposit box?',
        suggestions: ["safe deposit box"],
      });
    }
    
    return issues;
  },
};
