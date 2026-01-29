import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a scissor (scissors)
 * 
 * Source: LanguageTool (A_SCISSOR)
 * Category: grammar
 */
export const aScissorRule: GrammarRule = {
  id: 'a-scissor',
  name: 'a scissor (scissors)',
  description: 'The noun \"scissors\" is mostly used in plural form.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the\b\s+\bscissors?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun \"scissors\" is mostly used in plural form.',
        suggestions: ["scissors","\\1 pair of scissors"],
      });
    }
    
    return issues;
  },
};
