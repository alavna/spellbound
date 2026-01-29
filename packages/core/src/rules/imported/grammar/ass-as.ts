import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Ass vs As
 * 
 * Source: LanguageTool (ASS_AS)
 * Category: grammar
 */
export const assAsRule: GrammarRule = {
  id: 'ass-as',
  name: 'Ass vs As',
  description: 'Did you mean as?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bass\b\s+\bfar|well\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean as?',
        suggestions: ["as"],
      });
    }
    
    return issues;
  },
};
