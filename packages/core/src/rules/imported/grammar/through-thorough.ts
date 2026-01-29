import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a through(thorough) discussion etc.
 * 
 * Source: LanguageTool (THROUGH_THOROUGH)
 * Category: grammar
 */
export const throughThoroughRule: GrammarRule = {
  id: 'through-thorough',
  name: 'a through(thorough) discussion etc.',
  description: 'Did you mean thorough (accurate, exhaustive)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?\s+\bthrough\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean thorough (accurate, exhaustive)?',
        suggestions: ["thorough"],
      });
    }
    
    return issues;
  },
};
