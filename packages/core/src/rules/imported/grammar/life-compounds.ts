import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * life style (lifestyle)
 * 
 * Source: LanguageTool (LIFE_COMPOUNDS)
 * Category: grammar
 */
export const lifeCompoundsRule: GrammarRule = {
  id: 'life-compounds',
  name: 'life style (lifestyle)',
  description: 'This noun is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blife\b\s+\bstyles?|time|boats?|guards?|savers?|blood\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This noun is normally spelled as one word.',
        suggestions: ["life"],
      });
    }
    
    return issues;
  },
};
