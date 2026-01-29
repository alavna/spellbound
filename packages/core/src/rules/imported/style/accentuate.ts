import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * accentuate
 * 
 * Source: LanguageTool (ACCENTUATE)
 * Category: style
 */
export const accentuateRule: GrammarRule = {
  id: 'accentuate',
  name: 'accentuate',
  description: 'Replace with stress or emphasize.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Replace with stress or emphasize.',
        suggestions: ["stress","emphasize"],
      });
    }
    
    return issues;
  },
};
