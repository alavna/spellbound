import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * out grow (outgrow)
 * 
 * Source: LanguageTool (OUT_GROW)
 * Category: grammar
 */
export const outGrowRule: GrammarRule = {
  id: 'out-grow',
  name: 'out grow (outgrow)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bout\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
