import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'every/each' + SINGULAR
 * 
 * Source: LanguageTool (EVERY_EACH_SINGULAR)
 * Category: grammar
 */
export const everyEachSingularRule: GrammarRule = {
  id: 'every-each-singular',
  name: '\'every/each\' + SINGULAR',
  description: 'The noun should probably be in the singular form.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\beach|every\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun should probably be in the singular form.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
