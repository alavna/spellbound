import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * whole sale (wholesale)
 * 
 * Source: LanguageTool (WHOLE_COMPOUNDS)
 * Category: grammar
 */
export const wholeCompoundsRule: GrammarRule = {
  id: 'whole-compounds',
  name: 'whole sale (wholesale)',
  description: 'This word is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwhole\b\s+\bsale|some|hearted\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled as one word.',
        suggestions: ["whole"],
      });
    }
    
    return issues;
  },
};
