import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * verb acquire (get, develop)
 * 
 * Source: LanguageTool (ACQUIRE)
 * Category: style
 */
export const acquireRule: GrammarRule = {
  id: 'acquire',
  name: 'verb acquire (get, develop)',
  description: 'A simple get is enough most of the time, sometimes develop.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'A simple get is enough most of the time, sometimes develop.',
        suggestions: ["get","develop"],
      });
    }
    
    return issues;
  },
};
