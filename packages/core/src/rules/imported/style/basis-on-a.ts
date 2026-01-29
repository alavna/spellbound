import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * on a x basis
 * 
 * Source: LanguageTool (BASIS_ON_A)
 * Category: style
 */
export const basisOnARule: GrammarRule = {
  id: 'basis-on-a',
  name: 'on a x basis',
  description: 'Replace with the proper adverbial form of \\3ly.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bon\b\s+\ba\b\s+\bbasis\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Replace with the proper adverbial form of \\3ly.',
        suggestions: ["\\3ly"],
      });
    }
    
    return issues;
  },
};
