import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I've (I have) two tickets to see the Dodgers tonight
 * 
 * Source: LanguageTool (IVE_I_HAVE_AMERICAN_STYLE)
 * Category: style
 */
export const iveIHaveAmericanStyleRule: GrammarRule = {
  id: 'ive-i-have-american-style',
  name: 'I\'ve (I have) two tickets to see the Dodgers tonight',
  description: 'In American English, \"\\1\" and \"have\" do not usually form a contraction unless they\'re followed by a past participle.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI|you|we|they\b\s+'ve\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In American English, \"\\1\" and \"have\" do not usually form a contraction unless they\'re followed by a past participle.',
        suggestions: ["\\1 have","\\1\\2 got"],
      });
    }
    
    return issues;
  },
};
