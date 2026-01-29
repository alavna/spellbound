import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * anus (angus)
 * 
 * Source: LanguageTool (ANUS_ANGUS)
 * Category: grammar
 */
export const anusAngusRule: GrammarRule = {
  id: 'anus-angus',
  name: 'anus (angus)',
  description: 'Did you mean (verb) instead of (noun)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\banus\b\s+\bbeef|bulls?|burgers?|cattle|council|cows?|steaks?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean (verb) instead of (noun)?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
