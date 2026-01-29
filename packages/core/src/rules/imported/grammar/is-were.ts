import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * is were (where)
 * 
 * Source: LanguageTool (IS_WERE)
 * Category: grammar
 */
export const isWereRule: GrammarRule = {
  id: 'is-were',
  name: 'is were (where)',
  description: 'Did you mean where?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bis\b\s+\bwere\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean where?',
        suggestions: ["where"],
      });
    }
    
    return issues;
  },
};
