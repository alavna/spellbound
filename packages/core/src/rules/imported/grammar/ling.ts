import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ling (long)
 * 
 * Source: LanguageTool (LING)
 * Category: grammar
 */
export const lingRule: GrammarRule = {
  id: 'ling',
  name: 'ling (long)',
  description: 'Did you mean long?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bling\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean long?',
        suggestions: ["long"],
      });
    }
    
    return issues;
  },
};
