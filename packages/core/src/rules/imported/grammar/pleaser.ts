import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Pleaser (Please) let me know when you need these
 * 
 * Source: LanguageTool (PLEASER)
 * Category: grammar
 */
export const pleaserRule: GrammarRule = {
  id: 'pleaser',
  name: 'Pleaser (Please) let me know when you need these',
  description: 'Did you mean \"please\"?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpleaser\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \"please\"?',
        suggestions: ["please"],
      });
    }
    
    return issues;
  },
};
