import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * and than (then)
 * 
 * Source: LanguageTool (AND_THAN)
 * Category: grammar
 */
export const andThanRule: GrammarRule = {
  id: 'and-than',
  name: 'and than (then)',
  description: 'Did you mean then?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\band|since|until\b\s+\bthan\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean then?',
        suggestions: ["then"],
      });
    }
    
    return issues;
  },
};
