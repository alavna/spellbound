import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * if or not (whether or not)
 * 
 * Source: LanguageTool (IF_OR_NOT)
 * Category: grammar
 */
export const ifOrNotRule: GrammarRule = {
  id: 'if-or-not',
  name: 'if or not (whether or not)',
  description: 'This is a non-standard phrase. Did you mean whether or not?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bif\b\s+\bor\b\s+\bnot\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is a non-standard phrase. Did you mean whether or not?',
        suggestions: ["whether or not"],
      });
    }
    
    return issues;
  },
};
