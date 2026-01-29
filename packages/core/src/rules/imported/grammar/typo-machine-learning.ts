import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * machine leaning (learning)
 * 
 * Source: LanguageTool (TYPO_MACHINE_LEARNING)
 * Category: grammar
 */
export const typoMachineLearningRule: GrammarRule = {
  id: 'typo-machine-learning',
  name: 'machine leaning (learning)',
  description: 'Did you mean machine learning?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmachine\b\s+\bl[eai]a?n[aeiou]?r?i?n[aeiou]?g\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean machine learning?',
        suggestions: ["machine learning"],
      });
    }
    
    return issues;
  },
};
