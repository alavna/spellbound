import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * can checkout (check out)
 * 
 * Source: LanguageTool (CAN_CHECKOUT)
 * Category: grammar
 */
export const canCheckoutRule: GrammarRule = {
  id: 'can-checkout',
  name: 'can checkout (check out)',
  description: 'The verb \'check out\' is spelled as two words. The noun \'checkout\' is spelled as one.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcan(not)?|[wc]ould|should|might|must|may|did|to\b\s+\bcheck-?out\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The verb \'check out\' is spelled as two words. The noun \'checkout\' is spelled as one.',
        suggestions: ["\\1 check out"],
      });
    }
    
    return issues;
  },
};
