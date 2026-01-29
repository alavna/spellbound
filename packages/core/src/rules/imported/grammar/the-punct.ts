import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'The' or 'a' before a punctuation
 * 
 * Source: LanguageTool (THE_PUNCT)
 * Category: grammar
 */
export const thePunctRule: GrammarRule = {
  id: 'the-punct',
  name: '\'The\' or \'a\' before a punctuation',
  description: 'Articles like \'\' are rarely followed by punctuation. A word may be missing after \'\', or the punctuation mark may not be necessary.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Tt]he|an?|An\b\s+[,;]/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Articles like \'\' are rarely followed by punctuation. A word may be missing after \'\', or the punctuation mark may not be necessary.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
