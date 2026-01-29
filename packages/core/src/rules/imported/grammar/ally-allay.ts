import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'ally' used in wrong situation
 * 
 * Source: LanguageTool (ALLY_ALLAY)
 * Category: grammar
 */
export const allyAllayRule: GrammarRule = {
  id: 'ally-allay',
  name: '\'ally\' used in wrong situation',
  description: 'Did you mean allay?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bally\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean allay?',
        suggestions: ["allay"],
      });
    }
    
    return issues;
  },
};
