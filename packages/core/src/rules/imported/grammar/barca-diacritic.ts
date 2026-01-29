import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Barca or Barça
 * 
 * Source: LanguageTool (BARCA_DIACRITIC)
 * Category: grammar
 */
export const barcaDiacriticRule: GrammarRule = {
  id: 'barca-diacritic',
  name: 'Barca or Barça',
  description: 'Did you mean Barça (football club in Barcelona)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bBarca\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Barça (football club in Barcelona)?',
        suggestions: ["Barça"],
      });
    }
    
    return issues;
  },
};
