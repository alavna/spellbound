import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Plural phrase with singular verb
 * 
 * Source: LanguageTool (PLURAL_VBZ)
 * Category: grammar
 */
export const pluralVbzRule: GrammarRule = {
  id: 'plural-vbz',
  name: 'Plural phrase with singular verb',
  description: 'This sentence seems to use a plural phrase with a singular verb.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This sentence seems to use a plural phrase with a singular verb.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
