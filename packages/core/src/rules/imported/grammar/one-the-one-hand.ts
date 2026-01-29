import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'One the one hand' (On the one hand)
 * 
 * Source: LanguageTool (ONE_THE_ONE_HAND)
 * Category: grammar
 */
export const oneTheOneHandRule: GrammarRule = {
  id: 'one-the-one-hand',
  name: '\'One the one hand\' (On the one hand)',
  description: 'Did you mean on?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bOne\b\s+\bthe\b\s+\bone\.other\b\s+\bhand\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean on?',
        suggestions: ["on"],
      });
    }
    
    return issues;
  },
};
