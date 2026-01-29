import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * despite of (despite)
 * 
 * Source: LanguageTool (DESPITE_OF)
 * Category: grammar
 */
export const despiteOfRule: GrammarRule = {
  id: 'despite-of',
  name: 'despite of (despite)',
  description: 'Did you mean \\1 (or, alternatively, \'in spite of\')?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 (or, alternatively, \'in spite of\')?',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
