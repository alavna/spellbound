import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'also' at the end of the sentence
 * 
 * Source: LanguageTool (ALSO_SENT_END)
 * Category: style
 */
export const alsoSentEndRule: GrammarRule = {
  id: 'also-sent-end',
  name: '\'also\' at the end of the sentence',
  description: '\'Also\' is not used at the end of the sentence. Use as well or too instead.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\balso\b\s+\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'Also\' is not used at the end of the sentence. Use as well or too instead.',
        suggestions: ["as well","too"],
      });
    }
    
    return issues;
  },
};
