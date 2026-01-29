import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * might perhaps (might)
 * 
 * Source: LanguageTool (MIGHT_PERHAPS)
 * Category: style
 */
export const mightPerhapsRule: GrammarRule = {
  id: 'might-perhaps',
  name: 'might perhaps (might)',
  description: 'Consider using \\1, \\2.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bperhaps|possibly\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\1, \\2.',
        suggestions: ["\\1","\\2"],
      });
    }
    
    return issues;
  },
};
