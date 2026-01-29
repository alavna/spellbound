import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * These are some of the affects (effects) we've seen
 * 
 * Source: LanguageTool (AFFECTS)
 * Category: grammar
 */
export const affectsRule: GrammarRule = {
  id: 'affects',
  name: 'These are some of the affects (effects) we\'ve seen',
  description: 'Did you mean effect? \'\' is not commonly used as a noun, unless you are referring to characteristics of an emotional state.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?y?|much|no|the\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean effect? \'\' is not commonly used as a noun, unless you are referring to characteristics of an emotional state.',
        suggestions: ["effect"],
      });
    }
    
    return issues;
  },
};
