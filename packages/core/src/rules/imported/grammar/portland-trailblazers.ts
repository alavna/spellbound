import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Portland Trailblazers (Trail Blazers)
 * 
 * Source: LanguageTool (PORTLAND_TRAILBLAZERS)
 * Category: grammar
 */
export const portlandTrailblazersRule: GrammarRule = {
  id: 'portland-trailblazers',
  name: 'Portland Trailblazers (Trail Blazers)',
  description: 'Did you mean Portland Trail Blazers?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bPortland\b\s+\bTrailblazers\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Portland Trail Blazers?',
        suggestions: ["Portland Trail Blazers"],
      });
    }
    
    return issues;
  },
};
