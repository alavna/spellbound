import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I am no (not) coming
 * 
 * Source: LanguageTool (BE_NO_VB)
 * Category: grammar
 */
export const beNoVbRule: GrammarRule = {
  id: 'be-no-vb',
  name: 'I am no (not) coming',
  description: 'In this context, the correct negation is not. Or did you mean now?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bno\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In this context, the correct negation is not. Or did you mean now?',
        suggestions: ["not","now"],
      });
    }
    
    return issues;
  },
};
