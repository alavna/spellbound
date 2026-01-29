import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I did no (not) have
 * 
 * Source: LanguageTool (DO_NO_VB)
 * Category: grammar
 */
export const doNoVbRule: GrammarRule = {
  id: 'do-no-vb',
  name: 'I did no (not) have',
  description: 'In this context, the correct negation is not.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bno\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In this context, the correct negation is not.',
        suggestions: ["not"],
      });
    }
    
    return issues;
  },
};
