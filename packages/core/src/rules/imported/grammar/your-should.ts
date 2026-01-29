import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * your (you) should
 * 
 * Source: LanguageTool (YOUR_SHOULD)
 * Category: grammar
 */
export const yourShouldRule: GrammarRule = {
  id: 'your-should',
  name: 'your (you) should',
  description: 'Did you mean you?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byour\b\s+\bshould|could\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean you?',
        suggestions: ["you"],
      });
    }
    
    return issues;
  },
};
