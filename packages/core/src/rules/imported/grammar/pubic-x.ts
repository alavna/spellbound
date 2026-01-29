import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * pubic (public) education etc.
 * 
 * Source: LanguageTool (PUBIC_X)
 * Category: grammar
 */
export const pubicXRule: GrammarRule = {
  id: 'pubic-x',
  name: 'pubic (public) education etc.',
  description: 'Did you mean public?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpubic\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean public?',
        suggestions: ["public"],
      });
    }
    
    return issues;
  },
};
