import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * make since (sense)
 * 
 * Source: LanguageTool (MAKE_SINCE)
 * Category: grammar
 */
export const makeSinceRule: GrammarRule = {
  id: 'make-since',
  name: 'make since (sense)',
  description: 'Did you mean sense?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsince\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean sense?',
        suggestions: ["sense"],
      });
    }
    
    return issues;
  },
};
