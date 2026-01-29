import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Your loves (loved) one
 * 
 * Source: LanguageTool (YOUR_LOVES_ONES)
 * Category: grammar
 */
export const yourLovesOnesRule: GrammarRule = {
  id: 'your-loves-ones',
  name: 'Your loves (loved) one',
  description: 'Did you mean loved \\4?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the|my|y?our|their|her|his|th[eo]se\b\s+\S+\s+\bloves?\s+\bones?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean loved \\4?',
        suggestions: ["loved \\4"],
      });
    }
    
    return issues;
  },
};
