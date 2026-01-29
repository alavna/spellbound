import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * were vs wear
 * 
 * Source: LanguageTool (WERE_WEAR)
 * Category: grammar
 */
export const wereWearRule: GrammarRule = {
  id: 'were-wear',
  name: 'were vs wear',
  description: 'Did you mean the verb wear (= \"to wear a dress\")?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwere\b\s+\ban?|my|her|his|short|long\b\s+\S+\s+\bdress|shoes|rings?|(t-)?shirts?|sweaters?|hoodies?|hats?|jeans|trousers?|skirts?|sleeves?|suits?|cape\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb wear (= \"to wear a dress\")?',
        suggestions: ["wear"],
      });
    }
    
    return issues;
  },
};
