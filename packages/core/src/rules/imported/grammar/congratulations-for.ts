import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * congratulations for (on)
 * 
 * Source: LanguageTool (CONGRATULATIONS_FOR)
 * Category: grammar
 */
export const congratulationsForRule: GrammarRule = {
  id: 'congratulations-for',
  name: 'congratulations for (on)',
  description: 'The correct preposition here is on.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcongratulations\b\s+\bfor\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The correct preposition here is on.',
        suggestions: ["on"],
      });
    }
    
    return issues;
  },
};
