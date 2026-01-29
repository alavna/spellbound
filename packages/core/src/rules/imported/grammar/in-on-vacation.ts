import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in (on) vacation
 * 
 * Source: LanguageTool (IN_ON_VACATION)
 * Category: grammar
 */
export const inOnVacationRule: GrammarRule = {
  id: 'in-on-vacation',
  name: 'in (on) vacation',
  description: 'Did you mean on vacation?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bvacation\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean on vacation?',
        suggestions: ["on vacation"],
      });
    }
    
    return issues;
  },
};
