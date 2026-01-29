import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * female waiter (waitress)
 * 
 * Source: LanguageTool (FEMALE_WAITER)
 * Category: style
 */
export const femaleWaiterRule: GrammarRule = {
  id: 'female-waiter',
  name: 'female waiter (waitress)',
  description: 'Consider using waitress.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfemale|wom[ae]n\b\s+\bwaiter|waitress\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using waitress.',
        suggestions: ["waitress"],
      });
    }
    
    return issues;
  },
};
