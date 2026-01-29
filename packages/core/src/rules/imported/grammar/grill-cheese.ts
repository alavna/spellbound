import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * grill (grilled) cheese
 * 
 * Source: LanguageTool (GRILL_CHEESE)
 * Category: grammar
 */
export const grillCheeseRule: GrammarRule = {
  id: 'grill-cheese',
  name: 'grill (grilled) cheese',
  description: 'Did you mean grilled cheese?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgrill\b\s+\bcheese\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean grilled cheese?',
        suggestions: ["grilled cheese"],
      });
    }
    
    return issues;
  },
};
