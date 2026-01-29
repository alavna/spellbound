import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * inspired with (by)
 * 
 * Source: LanguageTool (INSPIRED_WITH)
 * Category: grammar
 */
export const inspiredWithRule: GrammarRule = {
  id: 'inspired-with',
  name: 'inspired with (by)',
  description: 'If \'\\2 \\3\' is passive voice, use \\2 by.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\binspired\b\s+\bwith\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'If \'\\2 \\3\' is passive voice, use \\2 by.',
        suggestions: ["\\2 by"],
      });
    }
    
    return issues;
  },
};
