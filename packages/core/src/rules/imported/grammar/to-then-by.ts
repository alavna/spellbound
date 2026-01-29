import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * to blank then (than) by
 * 
 * Source: LanguageTool (TO__THEN_BY)
 * Category: grammar
 */
export const toThenByRule: GrammarRule = {
  id: 'to-then-by',
  name: 'to blank then (than) by',
  description: 'Did you mean than ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bto\b\s+\bthen\b\s+\bby\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean than ?',
        suggestions: ["than"],
      });
    }
    
    return issues;
  },
};
