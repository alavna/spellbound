import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * CD disc (CD)
 * 
 * Source: LanguageTool (CD_DISC)
 * Category: style
 */
export const cdDiscRule: GrammarRule = {
  id: 'cd-disc',
  name: 'CD disc (CD)',
  description: 'Consider using \\1.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bCD|DVD\b\s+\bdis[kc]/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\1.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
