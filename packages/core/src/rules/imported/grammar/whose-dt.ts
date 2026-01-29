import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * whose DT (possessive)
 * 
 * Source: LanguageTool (WHOSE_DT)
 * Category: grammar
 */
export const whoseDtRule: GrammarRule = {
  id: 'whose-dt',
  name: 'whose DT (possessive)',
  description: 'Did you mean who\'s?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwhose\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean who\'s?',
        suggestions: ["who's"],
      });
    }
    
    return issues;
  },
};
