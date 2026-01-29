import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Missing hyphen: number + page/step/star
 * 
 * Source: LanguageTool (STARS_AND_STEPS)
 * Category: grammar
 */
export const starsAndStepsRule: GrammarRule = {
  id: 'stars-and-steps',
  name: 'Missing hyphen: number + page/step/star',
  description: '\' \' is missing a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bstar|page|slide|step\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\' \' is missing a hyphen.',
        suggestions: ["-"],
      });
    }
    
    return issues;
  },
};
