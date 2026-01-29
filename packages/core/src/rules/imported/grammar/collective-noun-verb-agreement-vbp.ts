import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a fleet of ships are (is)
 * 
 * Source: LanguageTool (COLLECTIVE_NOUN_VERB_AGREEMENT_VBP)
 * Category: grammar
 */
export const collectiveNounVerbAgreementVbpRule: GrammarRule = {
  id: 'collective-noun-verb-agreement-vbp',
  name: 'a fleet of ships are (is)',
  description: 'Possible verb agreement error. Did you mean ? (Some collective nouns can be treated as both singular and plural, so \'\\4\' is not always incorrect.)',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible verb agreement error. Did you mean ? (Some collective nouns can be treated as both singular and plural, so \'\\4\' is not always incorrect.)',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
