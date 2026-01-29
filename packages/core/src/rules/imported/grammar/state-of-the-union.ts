import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * proper capitalization of 'State of the Union'
 * 
 * Source: LanguageTool (STATE_OF_THE_UNION)
 * Category: grammar
 */
export const stateOfTheUnionRule: GrammarRule = {
  id: 'state-of-the-union',
  name: 'proper capitalization of \'State of the Union\'',
  description: 'Consider using the proper capitalization if you mean the president\'s annual speech.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bstate\b\s+\bof\b\s+\bthe\b\s+\bunion\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using the proper capitalization if you mean the president\'s annual speech.',
        suggestions: ["State of the Union"],
      });
    }
    
    return issues;
  },
};
