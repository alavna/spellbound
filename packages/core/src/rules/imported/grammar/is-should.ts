import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * is (it) should/could
 * 
 * Source: LanguageTool (IS_SHOULD)
 * Category: grammar
 */
export const isShouldRule: GrammarRule = {
  id: 'is-should',
  name: 'is (it) should/could',
  description: 'Did you mean it?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Ii]s\b\s+(should|could)/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean it?',
        suggestions: ["it"],
      });
    }
    
    return issues;
  },
};
