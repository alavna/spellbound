import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Halloween
 * 
 * Source: LanguageTool (HALLOWEEN)
 * Category: grammar
 */
export const halloweenRule: GrammarRule = {
  id: 'halloween',
  name: 'Halloween',
  description: 'The name of this day needs to be capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhalloween\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of this day needs to be capitalized.',
        suggestions: ["Halloween"],
      });
    }
    
    return issues;
  },
};
