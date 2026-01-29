import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * allude (elude)
 * 
 * Source: LanguageTool (ALLUDE_ELUDE)
 * Category: grammar
 */
export const alludeEludeRule: GrammarRule = {
  id: 'allude-elude',
  name: 'allude (elude)',
  description: 'Did you mean elude?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean elude?',
        suggestions: ["elude"],
      });
    }
    
    return issues;
  },
};
