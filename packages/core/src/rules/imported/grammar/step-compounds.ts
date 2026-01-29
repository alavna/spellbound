import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * step father (stepfather)
 * 
 * Source: LanguageTool (STEP_COMPOUNDS)
 * Category: grammar
 */
export const stepCompoundsRule: GrammarRule = {
  id: 'step-compounds',
  name: 'step father (stepfather)',
  description: 'The noun step is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bstep\b\s+(father|mother|mom|dad|son|daughter|brother|sister)s?|child|children|family|families|parents?|ladders?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun step is spelled as one word.',
        suggestions: ["step"],
      });
    }
    
    return issues;
  },
};
