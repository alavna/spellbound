import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bay area (Bay Area)
 * 
 * Source: LanguageTool (BAY_AREA)
 * Category: grammar
 */
export const bayAreaRule: GrammarRule = {
  id: 'bay-area',
  name: 'bay area (Bay Area)',
  description: 'Capitalize this word if you mean the region in California.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbay\b\s+\barea\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Capitalize this word if you mean the region in California.',
        suggestions: ["Bay Area"],
      });
    }
    
    return issues;
  },
};
