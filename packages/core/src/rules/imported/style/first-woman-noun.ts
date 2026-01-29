import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * first woman president (female president)
 * 
 * Source: LanguageTool (FIRST_WOMAN_NOUN)
 * Category: style
 */
export const firstWomanNounRule: GrammarRule = {
  id: 'first-woman-noun',
  name: 'first woman president (female president)',
  description: 'Use female.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfirst|second|third\b\s+\bwom[ae]n\b\s+\bofficer|commander|minister|player|graduate|engineer|doctor|dentist|teacher|professor|speaker|president|senator|representative|employee|athlete|instructor|nominee|judge\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Use female.',
        suggestions: ["female"],
      });
    }
    
    return issues;
  },
};
