import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * redundant determiner: 'in (an) alphabetical order
 * 
 * Source: LanguageTool (IN_X_ORDER)
 * Category: grammar
 */
export const inXOrderRule: GrammarRule = {
  id: 'in-x-order',
  name: 'redundant determiner: \'in (an) alphabetical order',
  description: 'Unless there is more than one \'\\3 \\4\', leave out the determiner \'\\2\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\ban?\s+\balphabetical|ascending|descending\b\s+\border\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Unless there is more than one \'\\3 \\4\', leave out the determiner \'\\2\'.',
        suggestions: ["\\1 \\3 \\4"],
      });
    }
    
    return issues;
  },
};
