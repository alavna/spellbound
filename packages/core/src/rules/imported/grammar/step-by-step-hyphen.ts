import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphens in 'step-by-step'
 * 
 * Source: LanguageTool (STEP_BY_STEP_HYPHEN)
 * Category: grammar
 */
export const stepByStepHyphenRule: GrammarRule = {
  id: 'step-by-step-hyphen',
  name: 'missing hyphens in \'step-by-step\'',
  description: 'Did you mean the adjective or adverb \\1-\\2-\\3 (spelled with hyphens)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bstep\b\s+\bby\b\s+\bstep\b\s+\S+\s+\btutorials?|guides?|instructions?|process(es)?|cookbooks?|podcasts?|audiobooks?|e\.?book|recipes?|directions|plan|diet|knitting|lyrics|learning|landscaping|programming|courses?|origami|painting|solutions?|teaching|videos?|workouts?|screenhots?|screencasts?|approach(es)?|configurations?|pictures?|diagnostics?|photos?|documentations?|procedures?|installations?|examples?|troubleshootings?|lists?|walkthrough|help|setups?|guidances?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adjective or adverb \\1-\\2-\\3 (spelled with hyphens)?',
        suggestions: ["\\1-\\2-\\3"],
      });
    }
    
    return issues;
  },
};
