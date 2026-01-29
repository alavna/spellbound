import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing 'to' after 'able'
 * 
 * Source: LanguageTool (ABLE_VBP)
 * Category: grammar
 */
export const ableVbpRule: GrammarRule = {
  id: 'able-vbp',
  name: 'missing \'to\' after \'able\'',
  description: 'The preposition \'to\' is required before the verb \'\\4\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+(un)?able\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The preposition \'to\' is required before the verb \'\\4\'.',
        suggestions: ["\\3 to \\4"],
      });
    }
    
    return issues;
  },
};
