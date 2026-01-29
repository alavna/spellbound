import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * coun't → couldn't, count
 * 
 * Source: LanguageTool (COUN_T)
 * Category: grammar
 */
export const counTRule: GrammarRule = {
  id: 'coun-t',
  name: 'coun\'t → couldn\'t, count',
  description: 'Typo detected. Did you mean couldn\\2\\3 or count?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcoun\b\s+&apostrophe;\s+\bt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Typo detected. Did you mean couldn\\2\\3 or count?',
        suggestions: ["couldn\\2\\3","count"],
      });
    }
    
    return issues;
  },
};
