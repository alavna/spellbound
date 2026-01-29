import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * equally as (equally)
 * 
 * Source: LanguageTool (EQUALLY_AS)
 * Category: grammar
 */
export const equallyAsRule: GrammarRule = {
  id: 'equally-as',
  name: 'equally as (equally)',
  description: 'Use either equally or as on its own. When comparing two nouns, use just as.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bequally\b\s+\bas\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Use either equally or as on its own. When comparing two nouns, use just as.',
        suggestions: ["equally","as","just as"],
      });
    }
    
    return issues;
  },
};
