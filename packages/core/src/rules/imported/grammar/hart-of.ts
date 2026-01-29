import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * He has a hart (heart) of a lion
 * 
 * Source: LanguageTool (HART_OF)
 * Category: grammar
 */
export const hartOfRule: GrammarRule = {
  id: 'hart-of',
  name: 'He has a hart (heart) of a lion',
  description: 'Did you mean to write \'heart\' here?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to write \'heart\' here?',
        suggestions: ["heart"],
      });
    }
    
    return issues;
  },
};
