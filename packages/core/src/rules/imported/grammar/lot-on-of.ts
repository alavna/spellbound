import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I have a lot on (of) balls
 * 
 * Source: LanguageTool (LOT_ON_OF)
 * Category: grammar
 */
export const lotOnOfRule: GrammarRule = {
  id: 'lot-on-of',
  name: 'I have a lot on (of) balls',
  description: 'Did you mean to write \'of\' here?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\ba\b\s+\blot\b\s+\bon\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to write \'of\' here?',
        suggestions: ["of"],
      });
    }
    
    return issues;
  },
};
