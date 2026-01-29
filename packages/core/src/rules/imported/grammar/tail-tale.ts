import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * tail vs tale
 * 
 * Source: LanguageTool (TAIL_TALE)
 * Category: grammar
 */
export const tailTaleRule: GrammarRule = {
  id: 'tail-tale',
  name: 'tail vs tale',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcautionary|inspirational\b\s+[Tt]ails?/gi;
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
