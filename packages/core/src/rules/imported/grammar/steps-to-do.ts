import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * steps to do/take
 * 
 * Source: LanguageTool (STEPS_TO_DO)
 * Category: grammar
 */
export const stepsToDoRule: GrammarRule = {
  id: 'steps-to-do',
  name: 'steps to do/take',
  description: 'The usual collocation for \"\\1\" is \"take\". Did you mean \\1 \\2 take?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bto\b\s+\bdo\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The usual collocation for \"\\1\" is \"take\". Did you mean \\1 \\2 take?',
        suggestions: ["\\1 \\2 take"],
      });
    }
    
    return issues;
  },
};
