import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * we'll vs well
 * 
 * Source: LanguageTool (WE_LL_WELL)
 * Category: grammar
 */
export const weLlWellRule: GrammarRule = {
  id: 'we-ll-well',
  name: 'we\'ll vs well',
  description: 'Did you mean well?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bwe\b\s+'ll\b\s+\bthe|that|this|an?|th[oe]se|some|any|if|once|there|s?he|they|you|I|it|we|his|her|our|my|its|their\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean well?',
        suggestions: ["well"],
      });
    }
    
    return issues;
  },
};
