import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * await (wait)
 * 
 * Source: LanguageTool (CONFUSION_AWAIT_WAIT)
 * Category: grammar
 */
export const confusionAwaitWaitRule: GrammarRule = {
  id: 'confusion-await-wait',
  name: 'await (wait)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\buntil|till\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
