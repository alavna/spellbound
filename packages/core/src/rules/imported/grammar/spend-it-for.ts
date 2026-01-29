import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Collocation: spend it for/on
 * 
 * Source: LanguageTool (SPEND_IT_FOR)
 * Category: grammar
 */
export const spendItForRule: GrammarRule = {
  id: 'spend-it-for',
  name: 'Collocation: spend it for/on',
  description: 'The usual prepositions that follow \"spend it\" are either \"on\" or \"in\". Did you mean spend it on?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bspend\b\s+\bit\b\s+\bfor\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The usual prepositions that follow \"spend it\" are either \"on\" or \"in\". Did you mean spend it on?',
        suggestions: ["spend it on"],
      });
    }
    
    return issues;
  },
};
