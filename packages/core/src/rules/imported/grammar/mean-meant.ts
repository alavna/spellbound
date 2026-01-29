import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * mean vs meant
 * 
 * Source: LanguageTool (MEAN_MEANT)
 * Category: grammar
 */
export const meanMeantRule: GrammarRule = {
  id: 'mean-meant',
  name: 'mean vs meant',
  description: 'Did you mean meant?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bmean\b\s+\bto\b\s+\S+\s+\bbe\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean meant?',
        suggestions: ["meant"],
      });
    }
    
    return issues;
  },
};
