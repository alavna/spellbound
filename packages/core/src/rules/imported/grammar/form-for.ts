import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Looks good form (for) me
 * 
 * Source: LanguageTool (FORM_FOR)
 * Category: grammar
 */
export const formForRule: GrammarRule = {
  id: 'form-for',
  name: 'Looks good form (for) me',
  description: 'Did you mean for?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\bform\b\s+\bme|us|you\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean for?',
        suggestions: ["for"],
      });
    }
    
    return issues;
  },
};
