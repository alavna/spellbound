import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * be use (used) to
 * 
 * Source: LanguageTool (BE_USE_TO_DO)
 * Category: grammar
 */
export const beUseToDoRule: GrammarRule = {
  id: 'be-use-to-do',
  name: 'be use (used) to',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbe\b\s+\buse\b\s+\bto\b/gi;
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
