import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * lose their life (lives)
 * 
 * Source: LanguageTool (LOSE_LIVES)
 * Category: grammar
 */
export const loseLivesRule: GrammarRule = {
  id: 'lose-lives',
  name: 'lose their life (lives)',
  description: 'Did you mean lives?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\btheir\b\s+\blife\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean lives?',
        suggestions: ["lives"],
      });
    }
    
    return issues;
  },
};
