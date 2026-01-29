import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * trad vs trade
 * 
 * Source: LanguageTool (TRAD_TRADE)
 * Category: grammar
 */
export const tradTradeRule: GrammarRule = {
  id: 'trad-trade',
  name: 'trad vs trade',
  description: 'Did you mean \\1e or traditional?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Tt]rad\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1e or traditional?',
        suggestions: ["\\1e","traditional"],
      });
    }
    
    return issues;
  },
};
