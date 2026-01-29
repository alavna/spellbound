import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * right in (up) my alley
 * 
 * Source: LanguageTool (RIGHT_IN_MY_ALLEY)
 * Category: grammar
 */
export const rightInMyAlleyRule: GrammarRule = {
  id: 'right-in-my-alley',
  name: 'right in (up) my alley',
  description: 'Did you mean \'up\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bright\b\s+\bin\b\s+\bmy\b\s+\balley\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \'up\'?',
        suggestions: ["up"],
      });
    }
    
    return issues;
  },
};
