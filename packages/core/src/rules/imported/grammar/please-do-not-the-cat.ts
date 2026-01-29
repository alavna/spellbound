import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * please do not (feed) the cat
 * 
 * Source: LanguageTool (PLEASE_DO_NOT_THE_CAT)
 * Category: grammar
 */
export const pleaseDoNotTheCatRule: GrammarRule = {
  id: 'please-do-not-the-cat',
  name: 'please do not (feed) the cat',
  description: 'It appears that a verb is missing after \"not\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdo\b\s+\bnot|n't\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a verb is missing after \"not\".',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
