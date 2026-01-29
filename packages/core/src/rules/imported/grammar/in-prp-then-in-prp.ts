import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * IN PRP then (than) IN PRP
 * 
 * Source: LanguageTool (IN_PRP_THEN_IN_PRP)
 * Category: grammar
 */
export const inPrpThenInPrpRule: GrammarRule = {
  id: 'in-prp-then-in-prp',
  name: 'IN PRP then (than) IN PRP',
  description: 'Did you mean than ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthen\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean than ?',
        suggestions: ["than"],
      });
    }
    
    return issues;
  },
};
