import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Comma in 'Me myself and I'
 * 
 * Source: LanguageTool (ME_MYSELF_AND_I_COMMA)
 * Category: grammar
 */
export const meMyselfAndICommaRule: GrammarRule = {
  id: 'me-myself-and-i-comma',
  name: 'Comma in \'Me myself and I\'',
  description: 'Consider adding a comma here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bme\b\s+\bmyself\b\s+\band|&amp;|or\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider adding a comma here.',
        suggestions: ["\\1,"],
      });
    }
    
    return issues;
  },
};
