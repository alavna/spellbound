import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I enrolled international school
 * 
 * Source: LanguageTool (ENROLLED_IN_FOR)
 * Category: grammar
 */
export const enrolledInForRule: GrammarRule = {
  id: 'enrolled-in-for',
  name: 'I enrolled international school',
  description: 'The usual collocation for \"\\2\" is \"in\" (a school) or \"for\" (a course). Did you mean \\1 \\2 in or \\1 \\2 for?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\benrolled\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The usual collocation for \"\\2\" is \"in\" (a school) or \"for\" (a course). Did you mean \\1 \\2 in or \\1 \\2 for?',
        suggestions: ["\\1 \\2 in","\\1 \\2 for"],
      });
    }
    
    return issues;
  },
};
