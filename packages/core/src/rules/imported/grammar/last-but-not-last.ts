import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * last but not last (least)
 * 
 * Source: LanguageTool (LAST_BUT_NOT_LAST)
 * Category: grammar
 */
export const lastButNotLastRule: GrammarRule = {
  id: 'last-but-not-last',
  name: 'last but not last (least)',
  description: 'Possible typo. Did you mean: \\1 \\2 \\3 least?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blast\b\s+\bbut\b\s+\bnot\b\s+\blast\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible typo. Did you mean: \\1 \\2 \\3 least?',
        suggestions: ["\\1 \\2 \\3 least"],
      });
    }
    
    return issues;
  },
};
