import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * pay roll (payroll)
 * 
 * Source: LanguageTool (ROLL_COMPOUNDS)
 * Category: grammar
 */
export const rollCompoundsRule: GrammarRule = {
  id: 'roll-compounds',
  name: 'pay roll (payroll)',
  description: 'This noun is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpay|bank|bed\b\s+\broll\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This noun is normally spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
