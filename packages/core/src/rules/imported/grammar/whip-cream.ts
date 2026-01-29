import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * whip cream (whipped cream)
 * 
 * Source: LanguageTool (WHIP_CREAM)
 * Category: grammar
 */
export const whipCreamRule: GrammarRule = {
  id: 'whip-cream',
  name: 'whip cream (whipped cream)',
  description: 'Did you mean whipped cream?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bwhip\b\s+\bcream\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean whipped cream?',
        suggestions: ["whipped cream"],
      });
    }
    
    return issues;
  },
};
