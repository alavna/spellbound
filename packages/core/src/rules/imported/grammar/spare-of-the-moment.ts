import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * spare (spur) of the moment
 * 
 * Source: LanguageTool (SPARE_OF_THE_MOMENT)
 * Category: grammar
 */
export const spareOfTheMomentRule: GrammarRule = {
  id: 'spare-of-the-moment',
  name: 'spare (spur) of the moment',
  description: 'Did you mean spur of the moment?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bspare\b\s+\bof\b\s+\bthe\b\s+\bmoment\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean spur of the moment?',
        suggestions: ["spur of the moment"],
      });
    }
    
    return issues;
  },
};
