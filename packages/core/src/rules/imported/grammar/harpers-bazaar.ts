import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Harper's Bazaar
 * 
 * Source: LanguageTool (HARPERS_BAZAAR)
 * Category: grammar
 */
export const harpersBazaarRule: GrammarRule = {
  id: 'harpers-bazaar',
  name: 'Harper\'s Bazaar',
  description: 'It appears that a possessive apostrophe is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bharpers?\s+\bbaa?zaa?r|magazine\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a possessive apostrophe is missing.',
        suggestions: ["Harper's"],
      });
    }
    
    return issues;
  },
};
