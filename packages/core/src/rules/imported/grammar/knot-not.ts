import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * knot (not)
 * 
 * Source: LanguageTool (KNOT_NOT)
 * Category: grammar
 */
export const knotNotRule: GrammarRule = {
  id: 'knot-not',
  name: 'knot (not)',
  description: 'Did you mean not?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bknot\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean not?',
        suggestions: ["not"],
      });
    }
    
    return issues;
  },
};
