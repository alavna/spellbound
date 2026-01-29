import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * (e)specially
 * 
 * Source: LanguageTool (ESPECIALLY)
 * Category: grammar
 */
export const especiallyRule: GrammarRule = {
  id: 'especially',
  name: '(e)specially',
  description: 'Consider using especially.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /,\s+\bspecially\b\s+\bones\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using especially.',
        suggestions: ["especially"],
      });
    }
    
    return issues;
  },
};
