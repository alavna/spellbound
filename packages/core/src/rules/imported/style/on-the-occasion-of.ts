import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * on the occasion of (on, when, because of)
 * 
 * Source: LanguageTool (ON_THE_OCCASION_OF)
 * Category: style
 */
export const onTheOccasionOfRule: GrammarRule = {
  id: 'on-the-occasion-of',
  name: 'on the occasion of (on, when, because of)',
  description: 'Did you mean on? Try also when and because of.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bon\b\s+\bthe\b\s+\boccasion\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean on? Try also when and because of.',
        suggestions: ["on","when","because of"],
      });
    }
    
    return issues;
  },
};
