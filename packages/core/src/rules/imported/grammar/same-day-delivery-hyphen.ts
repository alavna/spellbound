import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hyphen in 'same day delivery'
 * 
 * Source: LanguageTool (SAME_DAY_DELIVERY_HYPHEN)
 * Category: grammar
 */
export const sameDayDeliveryHyphenRule: GrammarRule = {
  id: 'same-day-delivery-hyphen',
  name: 'hyphen in \'same day delivery\'',
  description: 'It appears that a hyphen is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsame\b\s+\bday\b\s+\bdelivery|service\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a hyphen is missing.',
        suggestions: ["\\1-\\2 \\3 \\4"],
      });
    }
    
    return issues;
  },
};
