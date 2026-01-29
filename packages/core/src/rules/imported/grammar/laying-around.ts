import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * laying (lying) around
 * 
 * Source: LanguageTool (LAYING_AROUND)
 * Category: grammar
 */
export const layingAroundRule: GrammarRule = {
  id: 'laying-around',
  name: 'laying (lying) around',
  description: 'Did you mean lying ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blaying\b\s+\baround|low\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean lying ?',
        suggestions: ["lying"],
      });
    }
    
    return issues;
  },
};
