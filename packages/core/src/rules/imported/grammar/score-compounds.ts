import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * score card (scorecard)
 * 
 * Source: LanguageTool (SCORE_COMPOUNDS)
 * Category: grammar
 */
export const scoreCompoundsRule: GrammarRule = {
  id: 'score-compounds',
  name: 'score card (scorecard)',
  description: 'The noun score is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bscore\b\s+\bcards?|sheets?|books?|pads?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun score is spelled as one word.',
        suggestions: ["score"],
      });
    }
    
    return issues;
  },
};
