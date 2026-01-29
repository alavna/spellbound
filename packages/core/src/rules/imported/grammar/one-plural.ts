import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Agreement: 'one' + plural word
 * 
 * Source: LanguageTool (ONE_PLURAL)
 * Category: grammar
 */
export const onePluralRule: GrammarRule = {
  id: 'one-plural',
  name: 'Agreement: \'one\' + plural word',
  description: 'Please verify that the plural noun \"\\3\" is in agreement with the quantifier \"\\2\". Did you mean to use the singular form?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /1|one\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Please verify that the plural noun \"\\3\" is in agreement with the quantifier \"\\2\". Did you mean to use the singular form?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
