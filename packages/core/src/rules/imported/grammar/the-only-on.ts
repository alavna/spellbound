import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the only on (one)
 * 
 * Source: LanguageTool (THE_ONLY_ON)
 * Category: grammar
 */
export const theOnlyOnRule: GrammarRule = {
  id: 'the-only-on',
  name: 'the only on (one)',
  description: 'Did you mean one?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+\bonly|special|chosen\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean one?',
        suggestions: ["one"],
      });
    }
    
    return issues;
  },
};
