import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Possible wordiness: be a X one
 * 
 * Source: LanguageTool (BE_A_X_ONE)
 * Category: style
 */
export const beAXOneRule: GrammarRule = {
  id: 'be-a-x-one',
  name: 'Possible wordiness: be a X one',
  description: '\\1 \\3 may be more concise.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\ban?\s+\S+\s+\bone\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\\1 \\3 may be more concise.',
        suggestions: ["\\1 \\3"],
      });
    }
    
    return issues;
  },
};
