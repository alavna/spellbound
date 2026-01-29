import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * land lover (landlubber)
 * 
 * Source: LanguageTool (LAND_LOVER)
 * Category: grammar
 */
export const landLoverRule: GrammarRule = {
  id: 'land-lover',
  name: 'land lover (landlubber)',
  description: 'Did you mean landlubber?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bland\b\s+\blover\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean landlubber?',
        suggestions: ["landlubber"],
      });
    }
    
    return issues;
  },
};
