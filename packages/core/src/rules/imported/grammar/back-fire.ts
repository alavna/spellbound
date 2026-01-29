import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * back fire (backfire)
 * 
 * Source: LanguageTool (BACK_FIRE)
 * Category: grammar
 */
export const backFireRule: GrammarRule = {
  id: 'back-fire',
  name: 'back fire (backfire)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bback\b\s+\byes\b/gi;
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
