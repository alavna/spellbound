import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I would won't (want)
 * 
 * Source: LanguageTool (MD_WON_T)
 * Category: grammar
 */
export const mdWonTRule: GrammarRule = {
  id: 'md-won-t',
  name: 'I would won\'t (want)',
  description: 'You used two consecutive modal verbs. Please check if one can be removed or is misspelled.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\bwo\b\s+\bn't\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'You used two consecutive modal verbs. Please check if one can be removed or is misspelled.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
