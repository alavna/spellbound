import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * full fill (fulfill)
 * 
 * Source: LanguageTool (FULL_FILL)
 * Category: grammar
 */
export const fullFillRule: GrammarRule = {
  id: 'full-fill',
  name: 'full fill (fulfill)',
  description: 'The verb ful is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfull?\s+\bfill?(ed|s|ing)?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The verb ful is spelled as one word.',
        suggestions: ["ful"],
      });
    }
    
    return issues;
  },
};
