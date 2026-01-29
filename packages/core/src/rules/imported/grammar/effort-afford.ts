import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * effort vs afford
 * 
 * Source: LanguageTool (EFFORT_AFFORD)
 * Category: grammar
 */
export const effortAffordRule: GrammarRule = {
  id: 'effort-afford',
  name: 'effort vs afford',
  description: 'The word \"\\4\" is a noun. Did you mean afford?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\beffort\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \"\\4\" is a noun. Did you mean afford?',
        suggestions: ["afford"],
      });
    }
    
    return issues;
  },
};
