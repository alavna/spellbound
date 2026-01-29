import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ease (easy)
 * 
 * Source: LanguageTool (EASE_EASY)
 * Category: grammar
 */
export const easeEasyRule: GrammarRule = {
  id: 'ease-easy',
  name: 'ease (easy)',
  description: 'Did you mean easy?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bquite|pretty\b\s+\bease\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean easy?',
        suggestions: ["easy"],
      });
    }
    
    return issues;
  },
};
