import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the dutch (Dutch)
 * 
 * Source: LanguageTool (THE_DUTCH)
 * Category: grammar
 */
export const theDutchRule: GrammarRule = {
  id: 'the-dutch',
  name: 'the dutch (Dutch)',
  description: 'Capitalize this word if you are referring to the Netherlands.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdutch\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Capitalize this word if you are referring to the Netherlands.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
