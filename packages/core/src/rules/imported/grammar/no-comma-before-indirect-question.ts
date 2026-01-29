import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * no comma before indirect question
 * 
 * Source: LanguageTool (NO_COMMA_BEFORE_INDIRECT_QUESTION)
 * Category: grammar
 */
export const noCommaBeforeIndirectQuestionRule: GrammarRule = {
  id: 'no-comma-before-indirect-question',
  name: 'no comma before indirect question',
  description: 'If \\4 starts an indirect question, you do not need to put a comma before it.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+,\s+\bwh(ich|ere|at|[oy]|ether|ose)|if\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'If \\4 starts an indirect question, you do not need to put a comma before it.',
        suggestions: ["\\4"],
      });
    }
    
    return issues;
  },
};
