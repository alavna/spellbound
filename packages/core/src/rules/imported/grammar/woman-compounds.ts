import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * business woman (businesswoman)
 * 
 * Source: LanguageTool (WOMAN_COMPOUNDS)
 * Category: grammar
 */
export const womanCompoundsRule: GrammarRule = {
  id: 'woman-compounds',
  name: 'business woman (businesswoman)',
  description: 'The noun is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bspokes|congress|business|chair|fresh|front|camera|stunt\b\s+\bwom[ae]n\b/gi;
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
