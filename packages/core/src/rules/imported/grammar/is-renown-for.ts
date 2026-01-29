import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * is renown (renowned) for
 * 
 * Source: LanguageTool (IS_RENOWN_FOR)
 * Category: grammar
 */
export const isRenownForRule: GrammarRule = {
  id: 'is-renown-for',
  name: 'is renown (renowned) for',
  description: 'Did you mean is renowned for?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bis\b\s+\brenown\b\s+\bfor\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean is renowned for?',
        suggestions: ["is renowned for"],
      });
    }
    
    return issues;
  },
};
