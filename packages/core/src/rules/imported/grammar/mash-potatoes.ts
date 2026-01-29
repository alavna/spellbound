import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * mash (mashed) potatoes
 * 
 * Source: LanguageTool (MASH_POTATOES)
 * Category: grammar
 */
export const mashPotatoesRule: GrammarRule = {
  id: 'mash-potatoes',
  name: 'mash (mashed) potatoes',
  description: 'Did you mean mashed potatoes?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmash\b\s+\bpotatoes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean mashed potatoes?',
        suggestions: ["mashed potatoes"],
      });
    }
    
    return issues;
  },
};
