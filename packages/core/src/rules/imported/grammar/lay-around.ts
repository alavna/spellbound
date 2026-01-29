import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * lay (lie) around
 * 
 * Source: LanguageTool (LAY_AROUND)
 * Category: grammar
 */
export const layAroundRule: GrammarRule = {
  id: 'lay-around',
  name: 'lay (lie) around',
  description: 'Did you mean lie ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blay\b\s+\baround|low\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean lie ?',
        suggestions: ["lie"],
      });
    }
    
    return issues;
  },
};
