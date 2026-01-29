import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Dependent
 * 
 * Source: LanguageTool (DEPENDENT)
 * Category: grammar
 */
export const dependentRule: GrammarRule = {
  id: 'dependent',
  name: 'Dependent',
  description: 'Did you mean dependent on?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdependant\b\s+\bon\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean dependent on?',
        suggestions: ["dependent"],
      });
    }
    
    return issues;
  },
};
