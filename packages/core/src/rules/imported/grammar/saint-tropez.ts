import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Saint Tropez (Saint-Tropez)
 * 
 * Source: LanguageTool (SAINT_TROPEZ)
 * Category: grammar
 */
export const saintTropezRule: GrammarRule = {
  id: 'saint-tropez',
  name: 'Saint Tropez (Saint-Tropez)',
  description: 'The name of this town on the French Riviera is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bSaint\b\s+\bTropez\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of this town on the French Riviera is spelled with a hyphen.',
        suggestions: ["Saint-Tropez"],
      });
    }
    
    return issues;
  },
};
