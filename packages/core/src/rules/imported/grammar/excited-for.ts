import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Excited for (about)
 * 
 * Source: LanguageTool (EXCITED_FOR)
 * Category: grammar
 */
export const excitedForRule: GrammarRule = {
  id: 'excited-for',
  name: 'Excited for (about)',
  description: 'The correct preposition to be used with \"excited\" is about.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(over-?)?excited\b\s+\bfor|at|of\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The correct preposition to be used with \"excited\" is about.',
        suggestions: ["about"],
      });
    }
    
    return issues;
  },
};
