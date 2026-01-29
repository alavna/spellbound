import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Don't let any negativity to affect (affect) you
 * 
 * Source: LanguageTool (LET_IT_INFINITIVE)
 * Category: grammar
 */
export const letItInfinitiveRule: GrammarRule = {
  id: 'let-it-infinitive',
  name: 'Don\'t let any negativity to affect (affect) you',
  description: 'Using the to-infinitive may not be correct in this context. Consider using the bare infinitive (without \"to\") instead.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Using the to-infinitive may not be correct in this context. Consider using the bare infinitive (without \"to\") instead.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
