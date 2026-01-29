import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in the moment (currently)
 * 
 * Source: LanguageTool (IN_THE_MOMENT)
 * Category: grammar
 */
export const inTheMomentRule: GrammarRule = {
  id: 'in-the-moment',
  name: 'in the moment (currently)',
  description: 'Did you mean at the moment (=currently)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bthe\b\s+\bmoment\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean at the moment (=currently)?',
        suggestions: ["at the moment"],
      });
    }
    
    return issues;
  },
};
