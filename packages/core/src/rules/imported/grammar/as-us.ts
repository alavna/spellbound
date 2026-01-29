import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * as vs. us
 * 
 * Source: LanguageTool (AS_US)
 * Category: grammar
 */
export const asUsRule: GrammarRule = {
  id: 'as-us',
  name: 'as vs. us',
  description: 'Did you mean us?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Tt]o|[Ff]or|[Ww]ith|[Ff]rom\b\s+\bas\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean us?',
        suggestions: ["us"],
      });
    }
    
    return issues;
  },
};
