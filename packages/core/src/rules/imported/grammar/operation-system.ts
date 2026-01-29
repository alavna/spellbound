import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * operation (operating) system
 * 
 * Source: LanguageTool (OPERATION_SYSTEM)
 * Category: grammar
 */
export const operationSystemRule: GrammarRule = {
  id: 'operation-system',
  name: 'operation (operating) system',
  description: 'The word \'operation\' doesn\'t fit in this context.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\boperation\b\s+\bsystems?|income|margins?|cash|profits?|expenses?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \'operation\' doesn\'t fit in this context.',
        suggestions: ["operating"],
      });
    }
    
    return issues;
  },
};
