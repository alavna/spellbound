import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * naive vs native
 * 
 * Source: LanguageTool (NAIVE_NATIVE)
 * Category: grammar
 */
export const naiveNativeRule: GrammarRule = {
  id: 'naive-native',
  name: 'naive vs native',
  description: 'Did you mean native?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnaive\b\s+\bAmericans?|speakers?|apps?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean native?',
        suggestions: ["native"],
      });
    }
    
    return issues;
  },
};
