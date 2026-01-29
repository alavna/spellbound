import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * thunder storm (thunderstorm)
 * 
 * Source: LanguageTool (THUNDER_COMPOUNDS)
 * Category: grammar
 */
export const thunderCompoundsRule: GrammarRule = {
  id: 'thunder-compounds',
  name: 'thunder storm (thunderstorm)',
  description: 'The word thunder is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthunder\b\s+\bstorms?|birds?|snow|bolts?|claps?|clouds?|struck|showers?|heads?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word thunder is spelled as one word.',
        suggestions: ["thunder"],
      });
    }
    
    return issues;
  },
};
