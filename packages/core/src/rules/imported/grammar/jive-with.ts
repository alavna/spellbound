import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * jive (jibe) with
 * 
 * Source: LanguageTool (JIVE_WITH)
 * Category: grammar
 */
export const jiveWithRule: GrammarRule = {
  id: 'jive-with',
  name: 'jive (jibe) with',
  description: 'Make sure that \'\\1\' refers to a type of dance. Did you mean jibe with?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bjive\b\s+\bwith\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Make sure that \'\\1\' refers to a type of dance. Did you mean jibe with?',
        suggestions: ["jibe with"],
      });
    }
    
    return issues;
  },
};
