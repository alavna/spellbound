import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * for along time (for a long time)
 * 
 * Source: LanguageTool (FOR_ALONG_TIME)
 * Category: grammar
 */
export const forAlongTimeRule: GrammarRule = {
  id: 'for-along-time',
  name: 'for along time (for a long time)',
  description: 'Did you mean for a long time?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfor\b\s+\balong\b\s+\btime\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean for a long time?',
        suggestions: ["for a long time"],
      });
    }
    
    return issues;
  },
};
