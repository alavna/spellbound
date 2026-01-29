import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * look ate (at)
 * 
 * Source: LanguageTool (LOOK_ATE)
 * Category: grammar
 */
export const lookAteRule: GrammarRule = {
  id: 'look-ate',
  name: 'look ate (at)',
  description: 'Did you mean at?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bate\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean at?',
        suggestions: ["at"],
      });
    }
    
    return issues;
  },
};
