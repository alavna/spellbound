import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I crave for () chocolate
 * 
 * Source: LanguageTool (CRAVE_FOR)
 * Category: grammar
 */
export const craveForRule: GrammarRule = {
  id: 'crave-for',
  name: 'I crave for () chocolate',
  description: 'If you are using \"\\1\" as a verb, then you do not need the preposition \"for\" here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bfor\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'If you are using \"\\1\" as a verb, then you do not need the preposition \"for\" here.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
