import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * want be (won't be)
 * 
 * Source: LanguageTool (WANT_BE)
 * Category: grammar
 */
export const wantBeRule: GrammarRule = {
  id: 'want-be',
  name: 'want be (won\'t be)',
  description: 'Did you mean won\'t \\2 or want to \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwant\b\s+\bbe\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean won\'t \\2 or want to \\2?',
        suggestions: ["won't \\2","want to \\2","won't \\2"],
      });
    }
    
    return issues;
  },
};
