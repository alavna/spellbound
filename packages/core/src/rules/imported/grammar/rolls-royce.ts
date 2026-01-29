import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Rolls Royce (Rolls-Royce)
 * 
 * Source: LanguageTool (ROLLS_ROYCE)
 * Category: grammar
 */
export const rollsRoyceRule: GrammarRule = {
  id: 'rolls-royce',
  name: 'Rolls Royce (Rolls-Royce)',
  description: 'This car brand is normally spelled with a hyphen Rolls-Royce.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bRolls\b\s+\bRoyce\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This car brand is normally spelled with a hyphen Rolls-Royce.',
        suggestions: ["Rolls-Royce"],
      });
    }
    
    return issues;
  },
};
