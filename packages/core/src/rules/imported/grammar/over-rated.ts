import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * over rated (overrated)
 * 
 * Source: LanguageTool (OVER_RATED)
 * Category: grammar
 */
export const overRatedRule: GrammarRule = {
  id: 'over-rated',
  name: 'over rated (overrated)',
  description: 'Did you mean overrated?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bover\b\s+\brated\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean overrated?',
        suggestions: ["overrated"],
      });
    }
    
    return issues;
  },
};
