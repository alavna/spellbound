import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * couldve (could've)
 * 
 * Source: LanguageTool (COULDVE)
 * Category: grammar
 */
export const couldveRule: GrammarRule = {
  id: 'couldve',
  name: 'couldve (could\'ve)',
  description: 'Did you mean \'ve or have?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(c|w|should)ouldve\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \'ve or have?',
        suggestions: ["'ve","have"],
      });
    }
    
    return issues;
  },
};
