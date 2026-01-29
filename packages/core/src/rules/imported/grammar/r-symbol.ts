import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * (R) instead of ®
 * 
 * Source: LanguageTool (R_SYMBOL)
 * Category: grammar
 */
export const rSymbolRule: GrammarRule = {
  id: 'r-symbol',
  name: '(R) instead of ®',
  description: 'Did you mean ®?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\.\p\.Lu\.\.\.\s+\.\s+\bR\b\s+\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ®?',
        suggestions: ["®"],
      });
    }
    
    return issues;
  },
};
