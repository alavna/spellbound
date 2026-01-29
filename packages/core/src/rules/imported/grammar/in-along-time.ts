import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in along (a long) time
 * 
 * Source: LanguageTool (IN_ALONG_TIME)
 * Category: grammar
 */
export const inAlongTimeRule: GrammarRule = {
  id: 'in-along-time',
  name: 'in along (a long) time',
  description: 'Did you mean in a long time?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\balong\b\s+\btime\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean in a long time?',
        suggestions: ["in a long time"],
      });
    }
    
    return issues;
  },
};
