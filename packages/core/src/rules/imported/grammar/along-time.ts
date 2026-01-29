import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * along (a long) time
 * 
 * Source: LanguageTool (ALONG_TIME)
 * Category: grammar
 */
export const alongTimeRule: GrammarRule = {
  id: 'along-time',
  name: 'along (a long) time',
  description: 'Did you mean a long time?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\balong\b\s+\btime\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean a long time?',
        suggestions: ["a long time"],
      });
    }
    
    return issues;
  },
};
