import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * accustomed to
 * 
 * Source: LanguageTool (ACCUSTOMED_TO)
 * Category: grammar
 */
export const accustomedToRule: GrammarRule = {
  id: 'accustomed-to',
  name: 'accustomed to',
  description: 'Did you mean: accustomed to?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\baccustomed\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean: accustomed to?',
        suggestions: ["accustomed to"],
      });
    }
    
    return issues;
  },
};
