import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * market place (marketplace)
 * 
 * Source: LanguageTool (PLACE_COMPOUNDS)
 * Category: grammar
 */
export const placeCompoundsRule: GrammarRule = {
  id: 'place-compounds',
  name: 'market place (marketplace)',
  description: 'This is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmarket|birth\b\s+\bplaces?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is normally spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
