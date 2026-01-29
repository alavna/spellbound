import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * unexpected noun after 'to'
 * 
 * Source: LanguageTool (WANT_TO_NN)
 * Category: grammar
 */
export const wantToNnRule: GrammarRule = {
  id: 'want-to-nn',
  name: 'unexpected noun after \'to\'',
  description: 'Normally, after \"\\1 \\2\" a verb is expected.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Normally, after \"\\1 \\2\" a verb is expected.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
