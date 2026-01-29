import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Band Aid (Band-Aid)
 * 
 * Source: LanguageTool (BAND_AID)
 * Category: grammar
 */
export const bandAidRule: GrammarRule = {
  id: 'band-aid',
  name: 'Band Aid (Band-Aid)',
  description: 'The sticky tape used to cover wounds is normally capitalized (trademark) but also spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bband\b\s+\baids?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The sticky tape used to cover wounds is normally capitalized (trademark) but also spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
