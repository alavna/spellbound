import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Moist vs. Most
 * 
 * Source: LanguageTool (MOIST_MOST)
 * Category: grammar
 */
export const moistMostRule: GrammarRule = {
  id: 'moist-most',
  name: 'Moist vs. Most',
  description: 'Did you mean most?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmoist\b\s+\bof\b\s+\S+\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean most?',
        suggestions: ["most"],
      });
    }
    
    return issues;
  },
};
