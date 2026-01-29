import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'mail in'
 * 
 * Source: LanguageTool (MAIL_IN_HYPHEN)
 * Category: grammar
 */
export const mailInHyphenRule: GrammarRule = {
  id: 'mail-in-hyphen',
  name: 'missing hyphen in \'mail in\'',
  description: 'This is normally spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmail\b\s+\bin\b\s+\bvoting|ballots?|votes?|surveys?|rebates?|voters?|fraud\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is normally spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
