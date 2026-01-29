import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * cock tail (cocktail)
 * 
 * Source: LanguageTool (TAIL_COMPOUNDS)
 * Category: grammar
 */
export const tailCompoundsRule: GrammarRule = {
  id: 'tail-compounds',
  name: 'cock tail (cocktail)',
  description: 'This is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcock|pig|mock|duck|bob|pony|whip\b\s+\btails?/gi;
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
