import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * dosent (doesn't)
 * 
 * Source: LanguageTool (DOESENT)
 * Category: grammar
 */
export const doesentRule: GrammarRule = {
  id: 'doesent',
  name: 'dosent (doesn\'t)',
  description: 'Typo detected. Did you mean doesn\'t (= verb)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdoe?sent|doesint\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Typo detected. Did you mean doesn\'t (= verb)?',
        suggestions: ["doesn't"],
      });
    }
    
    return issues;
  },
};
