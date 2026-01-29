import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * fellow classmates/co-workers/comrades (classmates/co-workers/comrades)
 * 
 * Source: LanguageTool (FELLOW_CLASSMATE)
 * Category: style
 */
export const fellowClassmateRule: GrammarRule = {
  id: 'fellow-classmate',
  name: 'fellow classmates/co-workers/comrades (classmates/co-workers/comrades)',
  description: 'Consider using \\2.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfellow\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\2.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
