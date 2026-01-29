import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * is own
 * 
 * Source: LanguageTool (IS_OWN)
 * Category: grammar
 */
export const isOwnRule: GrammarRule = {
  id: 'is-own',
  name: 'is own',
  description: 'Did you mean its \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bis\b\s+\bown\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean its \\2?',
        suggestions: ["its \\2"],
      });
    }
    
    return issues;
  },
};
