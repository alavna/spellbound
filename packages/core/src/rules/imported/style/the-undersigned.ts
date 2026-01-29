import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the undersigned (I, me, we)
 * 
 * Source: LanguageTool (THE_UNDERSIGNED)
 * Category: style
 */
export const theUndersignedRule: GrammarRule = {
  id: 'the-undersigned',
  name: 'the undersigned (I, me, we)',
  description: 'Legalese. Did you mean I, me or we?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+\bundersigned\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Legalese. Did you mean I, me or we?',
        suggestions: ["I","me","we"],
      });
    }
    
    return issues;
  },
};
