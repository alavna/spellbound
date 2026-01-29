import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * first man president (male president)
 * 
 * Source: LanguageTool (FIRST_MAN_NOUN)
 * Category: style
 */
export const firstManNounRule: GrammarRule = {
  id: 'first-man-noun',
  name: 'first man president (male president)',
  description: 'Use male.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfirst|second|third\b\s+\bman\b\s+\bofficer|commander|minister|player|graduate|engineer|doctor|dentist|teacher|professor|speaker|president|senator|representative|employee|athlete|instructor|nominee|judge\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Use male.',
        suggestions: ["male"],
      });
    }
    
    return issues;
  },
};
