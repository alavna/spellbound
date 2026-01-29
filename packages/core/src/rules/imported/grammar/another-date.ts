import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * other (another) date
 * 
 * Source: LanguageTool (ANOTHER_DATE)
 * Category: grammar
 */
export const anotherDateRule: GrammarRule = {
  id: 'another-date',
  name: 'other (another) date',
  description: 'Did you mean another?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bother\b\s+\bdate\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean another?',
        suggestions: ["another"],
      });
    }
    
    return issues;
  },
};
