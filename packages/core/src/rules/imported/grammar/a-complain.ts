import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a + complain/restrain
 * 
 * Source: LanguageTool (A_COMPLAIN)
 * Category: grammar
 */
export const aComplainRule: GrammarRule = {
  id: 'a-complain',
  name: 'a + complain/restrain',
  description: 'The word \'\\3\' is a verb. Did you mean the noun ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the|my|his|her|their|our|your|'s\b\s+(complain|restrain|constrain)s?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \'\\3\' is a verb. Did you mean the noun ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
