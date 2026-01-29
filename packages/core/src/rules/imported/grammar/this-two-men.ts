import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * this (these) two men
 * 
 * Source: LanguageTool (THIS_TWO_MEN)
 * Category: grammar
 */
export const thisTwoMenRule: GrammarRule = {
  id: 'this-two-men',
  name: 'this (these) two men',
  description: 'Did you mean these?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthis\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean these?',
        suggestions: ["these"],
      });
    }
    
    return issues;
  },
};
