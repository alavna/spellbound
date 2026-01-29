import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Adapt to v. adopt to
 * 
 * Source: LanguageTool (ADOPT_TO)
 * Category: grammar
 */
export const adoptToRule: GrammarRule = {
  id: 'adopt-to',
  name: 'Adapt to v. adopt to',
  description: 'Did you mean adapt to?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\badopt\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean adapt to?',
        suggestions: ["adapt to"],
      });
    }
    
    return issues;
  },
};
