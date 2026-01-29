import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Non-infinitive verb with 'eager to...'
 * 
 * Source: LanguageTool (EAGER_TO)
 * Category: grammar
 */
export const eagerToRule: GrammarRule = {
  id: 'eager-to',
  name: 'Non-infinitive verb with \'eager to...\'',
  description: 'With \'eager to\', use the base form of the verb.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\beager\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'With \'eager to\', use the base form of the verb.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
