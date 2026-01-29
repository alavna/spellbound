import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * The symptom's (symptoms) vary
 * 
 * Source: LanguageTool (NOUN_APOSTROPHE_S_VERB)
 * Category: grammar
 */
export const nounApostropheSVerbRule: GrammarRule = {
  id: 'noun-apostrophe-s-verb',
  name: 'The symptom\'s (symptoms) vary',
  description: 'An apostrophe \'s\' denotes possession. Did you mean to use the plural form of the noun (no apostrophe)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /'s\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'An apostrophe \'s\' denotes possession. Did you mean to use the plural form of the noun (no apostrophe)?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
