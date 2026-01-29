import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * frisbee (Frisbee)
 * 
 * Source: LanguageTool (FRISBEE)
 * Category: grammar
 */
export const frisbeeRule: GrammarRule = {
  id: 'frisbee',
  name: 'frisbee (Frisbee)',
  description: 'The word for this plastic disk used to make sport is normally capitalized because it\'s a trademark.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfrisbees?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word for this plastic disk used to make sport is normally capitalized because it\'s a trademark.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
