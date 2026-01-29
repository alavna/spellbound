import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'four car garage'
 * 
 * Source: LanguageTool (CAR_HYPHEN)
 * Category: grammar
 */
export const carHyphenRule: GrammarRule = {
  id: 'car-hyphen',
  name: 'missing hyphen in \'four car garage\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /2|two|3|three|4|four|5|five|6|six\b\s+\bcar\b\s+\S+\s+\bgarage\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
