import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hair style (hairstyle)
 * 
 * Source: LanguageTool (HAIR_COMPOUNDS)
 * Category: grammar
 */
export const hairCompoundsRule: GrammarRule = {
  id: 'hair-compounds',
  name: 'hair style (hairstyle)',
  description: 'This is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhair\b\s+\bstyles?|bands?|brush(es)?|cloths?|balls?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is normally spelled as one word.',
        suggestions: ["hair"],
      });
    }
    
    return issues;
  },
};
