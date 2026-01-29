import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * all over the word (all over the world)
 * 
 * Source: LanguageTool (ALL_OVER_THE_WORD)
 * Category: grammar
 */
export const allOverTheWordRule: GrammarRule = {
  id: 'all-over-the-word',
  name: 'all over the word (all over the world)',
  description: 'Did you mean \\1 \\2 \\3 world (=globally)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ball\b\s+\bover\b\s+\bthe\b\s+\bword\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 \\2 \\3 world (=globally)?',
        suggestions: ["\\1 \\2 \\3 world"],
      });
    }
    
    return issues;
  },
};
