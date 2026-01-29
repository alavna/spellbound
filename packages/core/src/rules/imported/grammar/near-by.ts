import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * near by (nearby)
 * 
 * Source: LanguageTool (NEAR_BY)
 * Category: grammar
 */
export const nearByRule: GrammarRule = {
  id: 'near-by',
  name: 'near by (nearby)',
  description: 'Did you mean nearby?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnear\b\s+\bby\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean nearby?',
        suggestions: ["nearby"],
      });
    }
    
    return issues;
  },
};
