import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * baited (bated) breath
 * 
 * Source: LanguageTool (BAITED_BREATH)
 * Category: grammar
 */
export const baitedBreathRule: GrammarRule = {
  id: 'baited-breath',
  name: 'baited (bated) breath',
  description: 'Did you mean bated breath?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbaited\b\s+\bbreath\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean bated breath?',
        suggestions: ["bated breath"],
      });
    }
    
    return issues;
  },
};
