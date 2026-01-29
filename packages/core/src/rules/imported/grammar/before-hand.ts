import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * before hand (beforehand)
 * 
 * Source: LanguageTool (BEFORE_HAND)
 * Category: grammar
 */
export const beforeHandRule: GrammarRule = {
  id: 'before-hand',
  name: 'before hand (beforehand)',
  description: 'Did you mean beforehand?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbefore\b\s+\bhand\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean beforehand?',
        suggestions: ["beforehand"],
      });
    }
    
    return issues;
  },
};
