import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * minuet (minute)
 * 
 * Source: LanguageTool (MINUETS)
 * Category: grammar
 */
export const minuetsRule: GrammarRule = {
  id: 'minuets',
  name: 'minuet (minute)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bminuets?/gi;
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
