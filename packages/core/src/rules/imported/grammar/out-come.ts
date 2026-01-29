import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * out come (outcome)
 * 
 * Source: LanguageTool (OUT_COME)
 * Category: grammar
 */
export const outComeRule: GrammarRule = {
  id: 'out-come',
  name: 'out come (outcome)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bout\b\s+\bcomes?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
