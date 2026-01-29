import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * many time (times)
 * 
 * Source: LanguageTool (MANY_TIME)
 * Category: grammar
 */
export const manyTimeRule: GrammarRule = {
  id: 'many-time',
  name: 'many time (times)',
  description: 'Did you mean \\1 times or much time?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmany\b\s+\btime\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 times or much time?',
        suggestions: ["\\1 times","much time"],
      });
    }
    
    return issues;
  },
};
