import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * There are thousands of add-on(s) available
 * 
 * Source: LanguageTool (THOUSANDS_OF_NN)
 * Category: grammar
 */
export const thousandsOfNnRule: GrammarRule = {
  id: 'thousands-of-nn',
  name: 'There are thousands of add-on(s) available',
  description: 'The noun \'\' seems to be countable. Consider using the plural form: .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdozens|hundreds|thousands|millions|billions\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun \'\' seems to be countable. Consider using the plural form: .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
