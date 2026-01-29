import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * fall season (fall)
 * 
 * Source: LanguageTool (THE_FALL_SEASON)
 * Category: style
 */
export const theFallSeasonRule: GrammarRule = {
  id: 'the-fall-season',
  name: 'fall season (fall)',
  description: 'Consider using \\2.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+\bfall|winter|spring|summer|autumn\b\s+\bseason\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using \\2.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
