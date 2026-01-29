import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the it (IT)
 * 
 * Source: LanguageTool (THE_IT)
 * Category: grammar
 */
export const theItRule: GrammarRule = {
  id: 'the-it',
  name: 'the it (IT)',
  description: 'Please verify. Did you mean \\2 or the IT (= information technology)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+[Ii]t\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Please verify. Did you mean \\2 or the IT (= information technology)?',
        suggestions: ["\\2","the IT"],
      });
    }
    
    return issues;
  },
};
