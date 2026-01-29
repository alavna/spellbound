import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * shoe-in (shoo)
 * 
 * Source: LanguageTool (SHOE_IN)
 * Category: grammar
 */
export const shoeInRule: GrammarRule = {
  id: 'shoe-in',
  name: 'shoe-in (shoo)',
  description: 'Did you mean shoo-in?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bshoe-in\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean shoo-in?',
        suggestions: ["shoo-in"],
      });
    }
    
    return issues;
  },
};
