import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * which include but are not limited too (to)
 * 
 * Source: LanguageTool (LIMITED_TO)
 * Category: grammar
 */
export const limitedToRule: GrammarRule = {
  id: 'limited-to',
  name: 'which include but are not limited too (to)',
  description: 'Use \'to\' in this context.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\bbut\b\s+\bnot\b\s+\blimited\b\s+\btoo\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Use \'to\' in this context.',
        suggestions: ["to"],
      });
    }
    
    return issues;
  },
};
