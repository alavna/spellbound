import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the third-party
 * 
 * Source: LanguageTool (THE_THIRD_PARTY)
 * Category: grammar
 */
export const theThirdPartyRule: GrammarRule = {
  id: 'the-third-party',
  name: 'the third-party',
  description: 'The noun is written as two words.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: false, // DISABLED: Broken import - pattern lost during conversion

  check(context: GrammarRuleContext) {
    const pattern = /\bthe|an?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun is written as two words.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
