import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * mi (me)
 * 
 * Source: LanguageTool (MI)
 * Category: grammar
 */
export const miRule: GrammarRule = {
  id: 'mi',
  name: 'mi (me)',
  description: 'Did you mean me or my?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmi\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean me or my?',
        suggestions: ["me","my"],
      });
    }
    
    return issues;
  },
};
