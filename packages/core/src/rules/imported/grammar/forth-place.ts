import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * forth (fourth) place
 * 
 * Source: LanguageTool (FORTH_PLACE)
 * Category: grammar
 */
export const forthPlaceRule: GrammarRule = {
  id: 'forth-place',
  name: 'forth (fourth) place',
  description: 'Did you mean fourth place?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bforth\b\s+\bplace\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean fourth place?',
        suggestions: ["fourth place"],
      });
    }
    
    return issues;
  },
};
