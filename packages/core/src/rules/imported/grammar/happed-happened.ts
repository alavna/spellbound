import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * happed vs happened
 * 
 * Source: LanguageTool (HAPPED_HAPPENED)
 * Category: grammar
 */
export const happedHappenedRule: GrammarRule = {
  id: 'happed-happened',
  name: 'happed vs happened',
  description: 'Did you mean happened or happen?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhapped\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean happened or happen?',
        suggestions: ["happened","happen"],
      });
    }
    
    return issues;
  },
};
