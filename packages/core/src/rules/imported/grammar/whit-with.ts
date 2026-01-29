import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * whit vs with
 * 
 * Source: LanguageTool (WHIT_WITH)
 * Category: grammar
 */
export const whitWithRule: GrammarRule = {
  id: 'whit-with',
  name: 'whit vs with',
  description: 'Did you mean with (whit = a tiny amount)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwhit\b\s+\bthem|him|you|her|us|me|the|an?|his|y?our|my|their|its|this|that|no|all|th[eo]se\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean with (whit = a tiny amount)?',
        suggestions: ["with"],
      });
    }
    
    return issues;
  },
};
