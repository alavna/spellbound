import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * rely on
 * 
 * Source: LanguageTool (RELY_ON)
 * Category: grammar
 */
export const relyOnRule: GrammarRule = {
  id: 'rely-on',
  name: 'rely on',
  description: 'The verb \'rely\' requires the preposition \'on\' (or \'upon\').',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The verb \'rely\' requires the preposition \'on\' (or \'upon\').',
        suggestions: ["\\1 on"],
      });
    }
    
    return issues;
  },
};
