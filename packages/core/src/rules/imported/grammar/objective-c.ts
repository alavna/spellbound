import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Objective-C
 * 
 * Source: LanguageTool (OBJECTIVE_C)
 * Category: grammar
 */
export const objectiveCRule: GrammarRule = {
  id: 'objective-c',
  name: 'Objective-C',
  description: 'Did you mean the programming language Objective-C?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bObjective\b\s+\bC\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the programming language Objective-C?',
        suggestions: ["Objective-C"],
      });
    }
    
    return issues;
  },
};
