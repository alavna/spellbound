import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Collocation: we call/you would call
 * 
 * Source: LanguageTool (WHAT_WE_CALL_2)
 * Category: grammar
 */
export const whatWeCall2Rule: GrammarRule = {
  id: 'what-we-call-2',
  name: 'Collocation: we call/you would call',
  description: 'This expression sounds awkward. Did you mean \\2 \\3 you would call?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bnot\b\s+\bwhat\b\s+\bwe\b\s+\bcall\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This expression sounds awkward. Did you mean \\2 \\3 you would call?',
        suggestions: ["\\2 \\3 you would call"],
      });
    }
    
    return issues;
  },
};
