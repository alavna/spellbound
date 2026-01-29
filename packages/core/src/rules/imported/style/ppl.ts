import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * abbreviation 'ppl'
 * 
 * Source: LanguageTool (PPL)
 * Category: style
 */
export const pplRule: GrammarRule = {
  id: 'ppl',
  name: 'abbreviation \'ppl\'',
  description: 'The abbreviation for people can be considered informal.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Pp]pl\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The abbreviation for people can be considered informal.',
        suggestions: ["people","people","individuals"],
      });
    }
    
    return issues;
  },
};
