import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * all and all (all in all)
 * 
 * Source: LanguageTool (ALL_AND_ALL)
 * Category: grammar
 */
export const allAndAllRule: GrammarRule = {
  id: 'all-and-all',
  name: 'all and all (all in all)',
  description: 'This phrase is nonstandard. Did you mean all in all (=after all, nevertheless)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\band\b\s+\ball\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This phrase is nonstandard. Did you mean all in all (=after all, nevertheless)?',
        suggestions: ["all in all"],
      });
    }
    
    return issues;
  },
};
