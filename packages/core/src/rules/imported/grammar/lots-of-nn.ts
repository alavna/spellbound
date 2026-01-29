import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Possible agreement error: 'lots/plenty of' + singular countable noun
 * 
 * Source: LanguageTool (LOTS_OF_NN)
 * Category: grammar
 */
export const lotsOfNnRule: GrammarRule = {
  id: 'lots-of-nn',
  name: 'Possible agreement error: \'lots/plenty of\' + singular countable noun',
  description: 'Possible agreement error. The noun seems to be countable; consider using: of .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blots|plenty\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible agreement error. The noun seems to be countable; consider using: of .',
        suggestions: ["of"],
      });
    }
    
    return issues;
  },
};
