import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Collocation: arrived (in the) downtown
 * 
 * Source: LanguageTool (ARRIVED_IN)
 * Category: grammar
 */
export const arrivedInRule: GrammarRule = {
  id: 'arrived-in',
  name: 'Collocation: arrived (in the) downtown',
  description: 'Did you mean simply \\1 \\4? You do not need the word \"in\" here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bin\b\s+\bthe\b\s+\bdowntown\b\s+\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean simply \\1 \\4? You do not need the word \"in\" here.',
        suggestions: ["\\1 \\4"],
      });
    }
    
    return issues;
  },
};
