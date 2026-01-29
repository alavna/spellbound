import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * incorrect pronoun as subject ('Her loves me.')
 * 
 * Source: LanguageTool (WRONG_PRP_AT_SENT_START)
 * Category: grammar
 */
export const wrongPrpAtSentStartRule: GrammarRule = {
  id: 'wrong-prp-at-sent-start',
  name: 'incorrect pronoun as subject (\'Her loves me.\')',
  description: 'The subject form of the pronoun may be required here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bMe|Him|Her|Them\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The subject form of the pronoun may be required here.',
        suggestions: ["I","He","She","They"],
      });
    }
    
    return issues;
  },
};
