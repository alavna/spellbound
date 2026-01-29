import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * any more (anymore)
 * 
 * Source: LanguageTool (ANY_MORE)
 * Category: grammar
 */
export const anyMoreRule: GrammarRule = {
  id: 'any-more',
  name: 'any more (anymore)',
  description: 'Did you mean the adverb \\1\\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bany\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adverb \\1\\2?',
        suggestions: ["\\1\\2"],
      });
    }
    
    return issues;
  },
};
