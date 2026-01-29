import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * business man (businessman)
 * 
 * Source: LanguageTool (MAN_COMPOUNDS)
 * Category: grammar
 */
export const manCompoundsRule: GrammarRule = {
  id: 'man-compounds',
  name: 'business man (businessman)',
  description: 'The noun is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfisher|business|warehouse|chair|spokes|sales|horse|anchor|stunt|gun|congress|boogey|swords|fresh|sea|front|infantry|weather|council|camera\b\s+\bm[ae]n\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun is spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
