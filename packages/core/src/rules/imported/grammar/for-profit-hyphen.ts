import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'for-profit'
 * 
 * Source: LanguageTool (FOR_PROFIT_HYPHEN)
 * Category: grammar
 */
export const forProfitHyphenRule: GrammarRule = {
  id: 'for-profit-hyphen',
  name: 'missing hyphen in \'for-profit\'',
  description: 'The adjective \\3-\\4 is normally spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the|my|y?our|his|of\b\s+\S+\s+\bfor\b\s+\bprofit\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective \\3-\\4 is normally spelled with a hyphen.',
        suggestions: ["\\3-\\4"],
      });
    }
    
    return issues;
  },
};
