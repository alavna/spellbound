import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * wrong preposition: 'On addition' (In addition)
 * 
 * Source: LanguageTool (ON_ADDITION)
 * Category: grammar
 */
export const onAdditionRule: GrammarRule = {
  id: 'on-addition',
  name: 'wrong preposition: \'On addition\' (In addition)',
  description: 'Did you mean in?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\baddition\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean in?',
        suggestions: ["in"],
      });
    }
    
    return issues;
  },
};
