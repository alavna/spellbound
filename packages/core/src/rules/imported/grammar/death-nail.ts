import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * death nail (knell)
 * 
 * Source: LanguageTool (DEATH_NAIL)
 * Category: grammar
 */
export const deathNailRule: GrammarRule = {
  id: 'death-nail',
  name: 'death nail (knell)',
  description: 'Did you mean death knell?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdeath\b\s+\bnail\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean death knell?',
        suggestions: ["death knell"],
      });
    }
    
    return issues;
  },
};
